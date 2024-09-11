const { Op, QueryTypes } = require("sequelize");
const db = require("../models");
const surveyRepository = require("../repositories/surveyRepository");
const userRepository = require("../repositories/userRepository");
const wss = require("../config/wss");
const liveThreatConnector = require("../connector/liveThreatConnector");
const threatMapRepository = require("../repositories/threatMapRepository");
const { sha256 } = require("../utils/hash");
const tokenService = require("../services/tokenServices");

exports.refactoreMe1 = async (req, res) => {
  // function ini sebenarnya adalah hasil survey dri beberapa pertnayaan, yang mana nilai dri jawaban tsb akan di store pada array seperti yang ada di dataset
  try {
    const surveys = await surveyRepository.findAll();

    // create array of 10 index & empty array elements
    const index = Array.from({ length: 10 }, () => []);

    // put value n to to index n
    for (const survey of surveys) {
      for (const [i, value] of survey.values.entries()) {
        if (index[i]) {
          index[i].push(value);
        }
      }
    }

    // sum every index n
    const totalIndex = index.map((arrayOfNumber) => {
      if (arrayOfNumber.length > 0) {
        return arrayOfNumber.reduce((a, b) => a + b, 0) / 10;
      }

      return 0;
    });

    res.status(200).send({
      statusCode: 200,
      success: true,
      data: totalIndex,
    });
  } catch (err) {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).send({
      statusCode,
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

exports.refactoreMe2 = async (req, res) => {
  // function ini untuk menjalakan query sql insert dan mengupdate field "dosurvey" yang ada di table user menjadi true, jika melihat data yang di berikan, salah satu usernnya memiliki dosurvey dengan data false
  try {
    // insert data survey
    const data = await surveyRepository.create(req.body);

    // update user
    await userRepository.update(req.body.userId);

    res.status(201).send({
      statusCode: 201,
      message: "Survey sent successfully!",
      success: true,
      data,
    });
  } catch (err) {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).send({
      statusCode,
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

exports.callmeWebSocket = (server) => {
  // handle WebSocket connection: ws://localhost:3000/websocket
  wss.on("connection", (ws, request) => {
    console.log("[WEBSOCKET] Client connected via WebSocket");

    // fetch data every 3 minutes (180,000 milliseconds)
    const intervalId = setInterval(async () => {
      try {
        const data = await liveThreatConnector.fetchData();
        ws.send(JSON.stringify(data.data)); // Send data to the client
      } catch (err) {
        console.error("Error fetching data:", err);
        ws.send(
          JSON.stringify({ status: false, message: "Failed to fetch data" })
        );
      }
    }, 1 * 60 * 1000); // 3 minutes

    // handle message from client
    ws.on("message", (message) => {
      console.log("Received message from client:", message.toString("utf-8"));
    });

    // cleanup when WebSocket connection is closed
    ws.on("close", () => {
      console.log("[WEBSOCKET] Client disconnected");
      clearInterval(intervalId); // Stop interval when client disconnects
    });
  });

  // upgrade HTTP server to WebSocket
  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });
};

exports.getData = async (req, res) => {
  try {
    // get data from in-memory db (redis)
    let data = await threatMapRepository.getThreatMapAttackCache();

    // if data not exist, then get data from pg & set cache with TTL
    if (!data) {
      data = await threatMapRepository.findAll();
      await threatMapRepository.setThreatMapAttackCache(data);
    }

    const sourceResult = data.filter((v) => v.type === "source");
    const destinationResult = data.filter((v) => v.type === "destination");

    res.status(200).send({
      success: true,
      statusCode: 200,
      data: {
        label: [
          ...sourceResult.map((v) => v.country),
          ...destinationResult.map((v) => v.country),
        ],
        total: [
          ...sourceResult.map((v) => v.count),
          ...destinationResult.map((v) => v.count),
        ],
      },
    });
  } catch (err) {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).send({
      statusCode,
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  try {
    // get user by username
    const user = await userRepository.findByUsername(req.body.username);
    // check password
    const isLoginValid = user.password === sha256(req.body.password);

    if (!isLoginValid) {
      return res.status(401).send({
        statusCode: 401,
        success: false,
        message: "Invalid username or password",
      });
    }

    // create token
    const token = await tokenService.createSendToken(user);
    user.password = undefined;

    return res.status(200).send({
      statusCode: 200,
      success: false,
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).send({
      statusCode,
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};
