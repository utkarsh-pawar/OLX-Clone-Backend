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
    const { email, password, number } = req.body;
    if (!email && !number) {
      return res.status(400).json("enter all required fields");
    }

    if (!password) {
      return res.status(400).json("enter all required fields");
    }

    if (number) {
      const findByNumber = await User.findOne({ contact_no: number });
      if (!findByNumber) {
        return res.status(404).json("no user with given number found");
      }
      const compare = await bcrypt.compare(password, findByNumber.password);
      if (!compare) {
        return res.status(400).json("invalid credentials");
      }
      const token = jwt.sign({ userID: findByNumber._id }, config.JWT_SECRET, {
        expiresIn: "2 days",
      });

      const response = { ...defaultResponseObject };
      response.data = { userID: findByNumber._id };
      res.status(200).json({ response, token });
    } else {
      const findByEmail = await User.findOne({ email });
      if (!findByEmail) {
        return res.status(404).json("no user with given Email found");
      }
      const compare = await bcrypt.compare(password, findByEmail.password);
      if (!compare) {
        return res.status(400).json("invalid credentials");
      }
      const token = jwt.sign({ userID: findByEmail._id }, config.JWT_SECRET, {
        expiresIn: "2 days",
      });

      const response = { ...defaultResponseObject };
      response.data = { userID: findByEmail._id };
      res.status(200).json({ response, token });
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};
