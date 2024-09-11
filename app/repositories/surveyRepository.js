const { Op, QueryTypes } = require("sequelize");
const db = require("../models");

/**
 * find all surveys
 *
 * @async
 * @returns {array<object>}
 */
const findAll = async () => {
  const sql = `SELECT * FROM "surveys"`;
  return db.sequelize.query(sql, {
    type: QueryTypes.SELECT,
  });
};

/**
 * crate new survey
 *
 * @async
 * @param {object} data
 * @returns {promise<object>}
 */
const create = async (data) => {
  const sql = `INSERT INTO "surveys" ("userId", "values", "createdAt", "updatedAt") 
    VALUES (:userId, :values::INTEGER[], :createdAt, :updatedAt) RETURNING *`;
  const survey = await db.sequelize.query(sql, {
    replacements: {
      userId: data.userId,
      values: `{${data.values.join(",")}}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    type: QueryTypes.INSERT, // Specify the type of query
  });

  return survey[0][0];
};

const surveyRepository = {
  findAll,
  create,
};

module.exports = surveyRepository;
