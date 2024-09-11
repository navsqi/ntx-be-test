require("dotenv").config();
const redis = require("redis");
const { promisify } = require("util");

// Create redis client connection
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  auth_pass: process.env.REDIS_PASS,
});

exports.redisCreateConnection = async () => {
  redisClient.on("error", (err) => {
    console.log(err.message);
  });
  redisClient.on("reconnecting", () => {
    console.log("[REDIS] Reconnecting...");
  });
  redisClient.on("ready", () => {
    console.log("[REDIS] Ready");
  });
};

// Wrapper redis get and set in Promise
const GetAsync = promisify(redisClient.get).bind(redisClient);
const SetAsync = promisify(redisClient.setex).bind(redisClient);

// contoh penggunaan: const dataAllProfile = await redisGetAsync("allProfile");
exports.getAsync = GetAsync;
// contoh penggunaan: await redisSetAsync("allProfile", 300, JSON.stringify(dataAllProfile));
exports.setAsync = SetAsync;
