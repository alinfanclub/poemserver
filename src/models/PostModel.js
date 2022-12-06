const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      require: true,
    },
    islive: { type: Boolean, require: true, default: false }, // islive = false 임시저장 상태
  },
  { timestamps: true }
);

const Post = mongoose.model("post", PostSchema);
module.exports = { Post };
