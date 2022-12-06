const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const express = require("express");
const app = express();
const chalk = require("chalk");
const { routerUser, Postrouter, CommentRouter } = require("./src/api");
const path = require("path");
const fs = require("fs");

// mongodb URL
const MONGO_URI =
  "mongodb+srv://kimseounghun:tkgl5012qq21@mongodbstudy.rgulq2j.mongodb.net/BlogService?retryWrites=true&w=majority";

const sever = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    mongoose.set("debug", true);
    console.log("mongoDB is connected!");
    app.use(express.json());
    app.use(
      cors({
        origin: "*",
      })
    );
    // api
    app.use("/user", routerUser);
    app.use("/post", Postrouter);
    app.use("/comment", CommentRouter);
    // utils

    // server setup
    async function configServer() {
      port = 3000 || (await detectPort(3000)) || 3000;
    }
    configServer();

    app.listen(port, () =>
      console.log(
        `${chalk.white.bgHex("#41b883").bold(`SERVER IS RUNNING ON ${port}`)}`
      )
    );
  } catch (error) {
    console.log(error);
  }
};

sever();
