const bcrypt = require("bcryptjs");
const { Router } = require("express");

const { newToken } = require("../utils/auth.js");
const { User } = require("../models/UserModel");

const routerUser = Router();

routerUser.post("/login", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // find the user
  User.findOne({
    username: req.body.username,
  })
    .then((user) => {
      // non registered user
      if (!user) {
        res.status(401).send("Authentication failed. User not found.");
      }
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if (error) {
          res.status(500).send("Internal Server Error");
        }
        if (result) {
          // create token with user info
          const token = newToken(user);

          // current logged-in user
          const loggedInUser = {
            username: user.username,
            nickname: user.nickname,
          };

          // return the information including token as JSON
          res.status(200).json({
            success: true,
            user: loggedInUser,
            message: "Login Success",
            token: token,
          });
        } else {
          res.status(401).json("Authentication failed. Wrong password.");
        }
      });
    })
    .catch((error) => {
      res.status(500).json("Internal Server Error");
      throw error;
    });
});

routerUser.post("/signup", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const { username, password, nickname } = req.body;
  // encrypt password
  // NOTE: 10 is saltround which is a cost factor
  bcrypt.hash(password, 10, (error, hashedPassword) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        error,
      });
    } else {
      const newUser = new User({
        username,
        password: hashedPassword,
        nickname,
      });
      newUser.save((error, saved) => {
        if (error) {
          console.log(error);
          res.status(409).send(error);
        } else {
          console.log(saved);
          res.send(saved);
        }
      });
    }
  });
});

module.exports = {
  routerUser,
};
