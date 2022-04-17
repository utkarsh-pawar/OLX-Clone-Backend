import express from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const router = express.Router();

const verifyToken = (req, res, next) => {
  try {
    const header = req.headers.auth;
   
    const token = header.split(" ")[1];
    const isUser = jwt.verify(token, config.JWT_SECRET);
    if (!isUser.userID) {
      res.status(400).json("you are not authorized");
    }
    req.user = isUser;
    next();
  } catch (e) {
    res.status(400).json(e.message)
  }
};

export default verifyToken;
