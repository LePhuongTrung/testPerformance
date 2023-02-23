const jwt = require("jsonwebtoken");
const isLoggedIn = async (req, res, next) => {
  try {
    let token =
      req.cookies.access_token || req.headers.access_token || req.cookies.token;

    if (!token) return res.status(401).send("You are not logged in");
    const { UID, password, fullName, role } = await jwt.verify(
      token,
      process.env.SECRET_KEY
    );
    req.UID = UID;
    req.password = password;
    req.role = role;
    req.fullName = fullName;

    return next();
  } catch (error) {
    return res.status(401).send("Haven't logged in yet !!!");
  }
};

module.exports = {
  isLoggedIn,
};
