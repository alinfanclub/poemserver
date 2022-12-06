const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
    },
    insertedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
module.exports = { User };
