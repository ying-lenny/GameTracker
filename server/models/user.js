const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  name: { type: String, required: true }
});

UserSchema.virtual("url").get(function () {
  return "/users/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);