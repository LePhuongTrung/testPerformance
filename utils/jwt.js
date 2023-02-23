const jwt = require("jsonwebtoken");

const createToken = async (variable, key) => {
  try {
    if (!key) {
      key = process.env.SECRET_KEY;
    }
    const token = jwt.sign(variable, key);
    return token;
  } catch (error) {
    console.error("🚀 ~ file: jwt.js ~ line 7 ~ createToken ~ error", error);
    return error;
  }
};

module.exports = {
  createToken,
};
