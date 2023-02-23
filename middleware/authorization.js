const jwt = require("jsonwebtoken");
const { ASSISTANT_ROLE, MANAGER_ROLE } = require("../constants/role");

const ASSISTANT_Permission = async (req, res, next) => {
  if (req.role == ASSISTANT_ROLE) {
    return next();
  }
  return res.status(403).send("You are not ASSISTANT");
};

const MANAGER_Permission = async (req, res, next) => {
  if (req.role == MANAGER_ROLE) {
    return next();
  }
  return res.status(403).send("You are not MANAGER");
};

module.exports = {
  ASSISTANT_Permission,
  MANAGER_Permission,
};
