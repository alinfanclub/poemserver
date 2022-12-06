const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
      required: true,
    },
    nickname: {
      type:String,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("commnet", CommentSchema);
module.exports = { Comment };
