const { Router } = require("express");
const { Comment } = require("../models/CommentModel");
const CommentRouter = Router();
const { authenticateUser } = require("../utils/auth");

CommentRouter.post("/", authenticateUser, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const doc = await Comment.create({
      ...req.body,
      createdBy: req.user._id,
      nickname: req.user.nickname
    });
    res.status(201).json({ data: doc });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "sth wrong", error });
  }
});

CommentRouter.get("/:id", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const doc = await Comment.find({
      location: req.params.id,
      // _id: req.params.id,
    })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).json({ message: "The data is not found" });
    }

    res.status(200).json({ ...doc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "sth wrong", error });
  }
});

module.exports = {
  CommentRouter,
};
