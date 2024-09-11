const userRepository = require("../repositories/userRepository");
const tokenService = require("../services/tokenServices");

exports.protect = async (req, res, next) => {
  // 1) Check if token exist
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "You are not logged in! Please log in to get access",
      });
    }

    // 2) Verify token
    const verify = await tokenService.verify(token);

    // 3) Check if user exist
    const user = await userRepository.findByUsername(verify.username);

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "The user belonging this token does not exist",
      });
    }

    req.user = user;
    res.locals.user = user;

    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      statusCode: 401,
      success: false,
      message: "Unauthorized",
    });
  }
};

exports.allowTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        statusCode: 403,
        success: false,
        message: "You don't have permission to perform this action",
      });
    }

    return next();
  };
};
