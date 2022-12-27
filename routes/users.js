var express = require("express");
var router = express.Router();
require("../models/connection");
const { checkBody } = require("../modules/checkBody");

const uid2 = require("uid2");
const token = uid2(32);
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res) {
  res.json({ result: true });
});

module.exports = router;
