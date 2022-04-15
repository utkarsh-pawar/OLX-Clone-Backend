import express from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import { defaultResponseObject } from "../constants/responseObject.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import bcrypt from "bcrypt";
import Item from "../models/item.model.js";

export const verify = async (req, res) => {
  try {
    if (!req.user.userID) {
      res.status(400).json({ isUser: false });
    }
    res.status(200).json({ isUser: true });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const signup = async (req, res) => {
  try {
    const { name, contactNO, email, password, confirmPassword } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const numberAlreadyExists = await User.findOne({ contact_no: contactNO });
    const emailAlreadyExists = await User.findOne({ email });

    if (numberAlreadyExists || emailAlreadyExists) {
      return res
        .status(400)
        .json("account already exists with given number or email.");
    }

    const user = await new User({
      name,
      contact_no: contactNO,
      password: hashedPassword,
      email,
    });
    user.save();
    const response = { ...defaultResponseObject };
    response.data = user;
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    const compare = await bcrypt.compare(password, user.password);
    console.log(email, password);

    if (!compare) {
      return res.status(400).json("invalid credentials");
    }

    const token = jwt.sign({ userID: user._id }, config.JWT_SECRET, {
      expiresIn: "2 days",
    });

    const response = { ...defaultResponseObject };
    response.data = { userID: user._id };
    res.status(200).json({ response, token });
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const addItem = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const item = await new Item({
      userID: req.user.userID,
      name,
      price,
      description,
    });

    item.save();

    const response = { ...defaultResponseObject };
    response.data = item;
    res.status(201).json(response);
  } catch (e) {
    res.status(400).json(e.message);
  }
};
