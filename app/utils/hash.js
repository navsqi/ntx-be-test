const { createHash } = require("crypto");

const sha256 = (content) => {
  return createHash("sha256").update(content).digest("hex");
};

const hash = {
  sha256,
};

module.exports = hash;
