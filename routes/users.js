var express = require("express");
var router = express.Router();
require("../models/connection");
const { checkBody } = require("../modules/checkBody");

const uid2 = require("uid2");
const token = uid2(32);
const bcrypt = require("bcrypt");
const User = require("../models/users");

/* get all users */
router.get("/all", (req, res) => {
  User.find({}).then((data) => {
    res.json({ result: true, users: data });
  });
});
/* route signup. */
router.post("/signup", function (req, res) {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        token: token,
        profilSchema: [], // profil Monteur ou client
      });
      newUser.save().then((data) => {
        res.json({ result: true, user: data });
      });
    } else {
      res.json({ result: false, error: "your account already exists !" });
    }
  });
});

// router.post("/profil/:username", (req, res) => {
//   User.findOneAndUpdate(
//     { username: req.params.username },
//     {
//       $push: {
//         profil: { profils: req.body.profil },
//       },
//     }
//   ).then((data) => {
//     if (data) {
//       res.json({ result: true, data: data });
//     } else {
//       res.json({ result: false });
//     }
//   });
// });

// router.delete("/removeProfil/:username", (req, res) => {
//   User.findOneAndUpdate(
//     { username: req.params.username },
//     { $pull: { profil: { profils: req.body.profil } } }
//   ).then((data) => {
//     if (data) {
//       res.json({ result: true, data });
//     } else {
//       res.json({ result: false });
//     }
//   });
// });

/* routes signin */
router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  User.findOne({ username: req.body.username }).then((data) => {
    console.log(req.body);
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, user: data });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

module.exports = router;
