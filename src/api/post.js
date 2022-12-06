const { Router } = require("express");
const { Post } = require("../models/PostModel");
const Postrouter = Router();
const { authenticateUser } = require("../utils/auth");

Postrouter.post("/", authenticateUser, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const doc = await Post.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({ data: doc });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).send({ message: "Duplicated Data", error });
    }
    res.status(400).send({ message: "sth wrong", error });
  }
});

Postrouter.post("/temporarily", authenticateUser, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const doc = await Post.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({ data: doc });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).send({ message: "Duplicated Data", error });
    }
    res.status(400).send({ message: "sth wrong", error });
  }
});

Postrouter.get("/temporarilyGet", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const docs = await Post.find({
      createdBy: req.user._id,
    })
      .lean()
      .exec();

    res.status(200).json({
      posts: docs,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "sth wrong", error });
  }
});

Postrouter.get("/", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const docs = await Post.find({}).lean().exec();

    res.status(200).json({
      posts: docs,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "sth wrong", error });
  }
});

Postrouter.get("/ownpoem", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const docs = await Post.find({
      type: "자작 시",
    })
      .lean()
      .exec();

    res.status(200).json({
      posts: docs,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "sth wrong", error });
  }
});
Postrouter.get("/importedPoem", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const docs = await Post.find({
      type: "가져온 시",
    })
      .lean()
      .exec();

    res.status(200).json({
      posts: docs,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "sth wrong", error });
  }
});

Postrouter.get("/:id", async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const doc = await Post.findOne({
      _id: req.params.id,
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

Postrouter.put("/:id", authenticateUser, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const updatedDoc = await Post.findOneAndUpdate(
      {
        createdBy: req.user._id,
        _id: req.params.id,
      },
      req.body,
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedDoc) {
      return res.status(400).json({ message: "cannot update the data" });
    }

    res.status(200).json({ ...updatedDoc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "sth wrong", error });
  }
});

Postrouter.delete("/:id", authenticateUser, async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const removed = await Post.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id,
    })
      .lean()
      .exec();

    if (!removed) {
      return res.status(400).json({ message: "cannot remove the data" });
    }

    return res.status(200).json({ ...removed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "sth wrong", error });
  }
});

module.exports = {
  Postrouter,
};
