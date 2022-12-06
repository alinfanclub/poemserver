const { Router } = require("express");
const { Comment } = require("../models/CommentModel");
const CommentRouter = Router();
const { authenticateUser } = require("../utils/auth");

CommentRouter.post("/", authenticateUser, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const doc = await Comment.create({
      ...req.body,
      createBy: req.user._id,
      commenter: req.user.unsername,
    });
    res.status(201).json({ data: doc });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "sth wrong", error });
  }
});

module.exports = {
  CommentRouter,
};
