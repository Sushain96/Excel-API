const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A USER MUST HAVE A NAME"],
  },
  email: {
    type: String,
    required: [true, "A USER MUST HAVE AN EMAIL"],
    unique: [true, "Email already exists"],
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Kindly enter Password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Kindly confirm Password"],
    validate: {
      validator: function (val) {
        // this only works on CREATE and SAVE!!
        return val === this.password;
      },
      message: "Passwords donot match",
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
