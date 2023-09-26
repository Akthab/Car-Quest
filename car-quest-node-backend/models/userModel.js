const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: [true, "Please provide a password"] },
  },
  { collection: "users" }
);

const model = mongoose.model("users", User);

module.exports = model;
