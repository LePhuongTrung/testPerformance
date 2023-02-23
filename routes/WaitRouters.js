var express = require("express");
var router = express.Router();
const Controller = require("../Controllers/WaitControllers");

router.post("/getNumber", Controller.getNumber);

router.post("/nextNumber", Controller.nextNumber);

router.get("/learn", (req, res) => {
  return res.status(200).send("1");
});

module.exports = router;
