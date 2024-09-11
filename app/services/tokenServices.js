const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const _signToken = async (user) => {
  return await jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: 3600,
    }
  );
};

const createSendToken = async (user) => {
  const token = await _signToken(user);

  user.password = undefined;

  return token;
};

// 2) Verify token
const verify = async (token) => {
  return promisify(jwt.verify)(token, process.env.JWT_SECRET);
};

const tokenService = {
  createSendToken,
  verify,
};

module.exports = tokenService;
