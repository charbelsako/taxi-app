const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");

const userSchema = new mongoose.Schema(
  {
    email: { type: String },
    name: { type: String },
    username: { type: String },
    password: { type: String },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(autoIncrement, {
  model: "user",
  field: "_id",
  startAt: 1,
});

const User = mongoose.model("user", userSchema);
module.exports = User;
