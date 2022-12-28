const mongoose = require("mongoose");

// const profilSchema = mongoose.Schema({
//   profils: String,
// });

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  token: String,
  // profil: [profilSchema],
});

const User = mongoose.model("users", userSchema);
module.exports = User;
