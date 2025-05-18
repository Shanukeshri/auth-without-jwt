const mongoose = require("mongoose");

userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
})

const user = mongoose.model('user' , userSchema )
module.exports = user