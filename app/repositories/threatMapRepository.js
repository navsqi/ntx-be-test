const { Op, QueryTypes } = require("sequelize");
const db = require("../models");
const redis = require("../config/redis");

/**
 * find all threat map attack
 *
 * @async
 * @returns {promise<array<object>>}
 */
const findAll = async () => {
  const sql = `SELECT "sourceCountry" AS country, COUNT(*) AS count, 'source' AS type
                FROM threat_map
                GROUP BY "sourceCountry"
                UNION ALL
                SELECT "destinationCountry" AS country, COUNT(*) AS count, 'destination' AS type
                FROM threat_map
                GROUP BY "destinationCountry"
                ORDER BY country ASC;
`;
  return db.sequelize.query(sql, {
    type: QueryTypes.SELECT,
  });
};

/**
 * getThreatMapAttackCache
 *
 * @async
 * @returns {promise<object>}
 */
const getThreatMapAttackCache = async () => {
  const cache = await redis.getAsync("ThreatMapAttack");

  return cache ? JSON.parse(cache) : null;
};

/**
 * setThreatMapAttackCache
 *
 * @async
 * @param {array<object>} data
 * @returns {promise<number>}
 */
const setThreatMapAttackCache = async (data) => {
  return redis.setAsync("ThreatMapAttack", 3600, JSON.stringify(data));
};

const threatMapRepository = {
  findAll,
  getThreatMapAttackCache,
  setThreatMapAttackCache,
};

module.exports = threatMapRepository;
