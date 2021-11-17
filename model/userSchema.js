const bcyrpt = require("bcryptjs");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("USER", userSchema);
module.exports = User;
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcyrpt.hash(this.password, 12);
    this.cpassword = await bcyrpt.hash(this.cpassword, 12);
  }
});
