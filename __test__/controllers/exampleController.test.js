jest.mock("redis", () => jest.requireActual("redis-mock"));
const { getMockReq, getMockRes } = require("@jest-mock/express");
const WS = require("jest-websocket-mock");
const http = require("http");

const exampleController = require("../../app/controllers/exampleController");
const surveyRepository = require("../../app/repositories/surveyRepository");
const liveThreatConnector = require("../../app/connector/liveThreatConnector");
const surveysFixture = require("../fixtures/surveys.fixture");
const threatMapAttackFixture = require("../fixtures/threatMapAttack.fixture");
const wss = require("../../app/config/wss.js");
const userRepository = require("../../app/repositories/userRepository.js");
const threatMapRepository = require("../../app/repositories/threatMapRepository.js");

// Mock liveThreatConnector
// jest.mock("../../app/connector/liveThreatConnector.js", () => ({
//   fetchData: jest.fn(),
// }));

describe("#exampleController", () => {
  let req;
  let res;
  let next;

  let server;
  let ws;

  beforeEach(() => {
    let { res: responseFunction, next: nextFunction, mockClear } = getMockRes();
    mockClear();

    req = getMockReq();
    res = responseFunction;
    next = nextFunction;

    // WebSocket configuration
    // Create HTTP server and WebSocket server
    server = http.createServer();

    ws = {
      send: jest.fn(),
      on: jest.fn((event, callback) => {
        if (event === "message") {
          callback("test message from client");
        }
      }),
      close: jest.fn(),
    };
  });

  afterEach(() => {
    server.close();
  });

  describe("GET /api/threat/map/attack", () => {
    it("should get data from cache and return mapped threat attack data", async () => {
      const getThreatMapAttackCacheSpy = jest.spyOn(
        threatMapRepository,
        "getThreatMapAttackCache"
      );
      getThreatMapAttackCacheSpy.mockResolvedValue(threatMapAttackFixture);
      await exampleController.getData(req, res);

      expect(getThreatMapAttackCacheSpy).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith({
        success: true,
        statusCode: 200,
        data: {
          label: ["GB", "ID", "NL", "US", "AU", "IL", "IN", "US"],
          total: ["1", "1", "5", "6", "4", "4", "4", "1"],
        },
      });
    });

    it("should get data from postgresql and set redis cache", async () => {
      const getThreatMapAttackCacheSpy = jest.spyOn(
        threatMapRepository,
        "getThreatMapAttackCache"
      );
      getThreatMapAttackCacheSpy.mockResolvedValue(null);

      const findAllSpy = jest.spyOn(threatMapRepository, "findAll");
      findAllSpy.mockResolvedValue(threatMapAttackFixture);

      const setThreatMapAttackCacheSpy = jest.spyOn(
        threatMapRepository,
        "setThreatMapAttackCache"
      );
      setThreatMapAttackCacheSpy.mockResolvedValue(1);
      await exampleController.getData(req, res);

      expect(findAllSpy).toHaveBeenCalledTimes(1);
      expect(setThreatMapAttackCacheSpy).toHaveBeenCalledTimes(1);
    });

    it("should return status false and error message if any error", async () => {
      const getThreatMapAttackCacheSpy = jest.spyOn(
        threatMapRepository,
        "getThreatMapAttackCache"
      );
      getThreatMapAttackCacheSpy.mockImplementation(() => {
        throw new Error();
      });
      await exampleController.getData(req, res);

      expect(getThreatMapAttackCacheSpy).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith({
        statusCode: 500,
        success: false,
        message: "Something went wrong",
      });
    });
  });

  describe("GET /api/refactorme1", () => {
    it("should return status true and mapped survey data", async () => {
      const findAllSurveySpy = jest.spyOn(surveyRepository, "findAll");
      findAllSurveySpy.mockResolvedValue(surveysFixture);
      await exampleController.refactoreMe1(req, res);

      expect(findAllSurveySpy).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith({
        statusCode: 200,
        success: true,
        data: [117, 208, 297, 385, 27, 0, 0, 0, 0, 0],
      });
    });

    it("should return status false and error message if any error", async () => {
      const findAllSurveySpy = jest.spyOn(surveyRepository, "findAll");
      findAllSurveySpy.mockImplementation(() => {
        throw new Error();
      });
      await exampleController.refactoreMe1(req, res);

      expect(findAllSurveySpy).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith({
        statusCode: 500,
        success: false,
        message: "Something went wrong",
      });
    });
  });

  describe("POST /api/refactorme2", () => {
    it("should return status true and survey data", async () => {
      const mockSurvey = surveysFixture[0];
      req = getMockReq({
        body: {
          userId: mockSurvey.userId,
          values: mockSurvey.values,
        },
      });
      const createSurveySpy = jest.spyOn(surveyRepository, "create");
      createSurveySpy.mockResolvedValue(mockSurvey);
      const userRepositorySpy = jest.spyOn(userRepository, "update");
      userRepositorySpy.mockResolvedValue(true);
      await exampleController.refactoreMe2(req, res);

      expect(createSurveySpy).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith({
        statusCode: 201,
        message: "Survey sent successfully!",
        success: true,
        data: mockSurvey,
      });
    });

    it("should return status false and error message if any error", async () => {
      const mockSurvey = surveysFixture[0];
      req = getMockReq({
        body: {
          userId: mockSurvey.userId,
          values: mockSurvey.values,
        },
      });
      const createSurveySpy = jest.spyOn(surveyRepository, "create");
      createSurveySpy.mockImplementation(() => {
        throw new Error();
      });
      await exampleController.refactoreMe2(req, res);

      expect(createSurveySpy).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith({
        statusCode: 500,
        success: false,
        message: "Something went wrong",
      });
    });
  });

  describe("Websocket", () => {
    jest.useFakeTimers();
    test("should handle WebSocket connection and fetch data every 3 minutes", async () => {
      jest.spyOn(wss, "on");
      const liveThreatConnectorSpy = jest.spyOn(
        liveThreatConnector,
        "fetchData"
      );
      liveThreatConnectorSpy.mockResolvedValue({ data: {} });
      await exampleController.callmeWebSocket(server);
      wss.emit("connection", ws, {});

      // Fast-forward until all timers have been executed
      jest.advanceTimersByTime(200000);

      expect(wss.on).toHaveBeenCalledWith("connection", expect.anything());
      expect(liveThreatConnector.fetchData).toHaveBeenCalled();
    });
  });
});
