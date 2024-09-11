const { Op, QueryTypes } = require("sequelize");
const db = require("../models");
const hash = require("../utils/hash");

/**
 * update user by id
 *
 * @async
 * @param {string} id
 * @returns {promise<object>}
 */
const update = async (id) => {
  const sql = `UPDATE "users" SET dosurvey = :doSurvey WHERE id = :id`;
  return db.sequelize.query(sql, {
    replacements: {
      id,
      doSurvey: true,
    },
    type: QueryTypes.UPDATE,
  });
};

/**
 * update user by id
 *
 * @async
 * @param {string} id
 * @returns {promise<object>}
 */
const findByUsername = async (username) => {
  const sql = `SELECT * FROM "users" WHERE username = :username LIMIT 1`;
  const user = await db.sequelize.query(sql, {
    replacements: {
      username,
    },
    type: QueryTypes.SELECT,
  });

  return user && user.length > 0 ? user[0] : null;
};

const userRepository = {
  update,
  findByUsername,
};

module.exports = userRepository;
