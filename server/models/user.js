const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
})

UserSchema.virtual("url").get(function () {
  return "/users/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);