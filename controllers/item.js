import express from "express";
import mongoose from "mongoose";
import { defaultResponseObject } from "../constants/responseObject.js";
import Item from "../models/item.model.js";

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    const response = { ...defaultResponseObject };
    response.data = items;
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const getItem = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const item = await Item.findById({ _id: id });
    console.log(item);
    if (!item) {
      return res.status(400).json("something went wrong");
    }
    const response = { ...defaultResponseObject };
    response.data = item;
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const addItem = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
      return res.status(400).json("enter all the required fields!!!");
    }
    const imgArr = [];
  

    await req.files.map((file) => imgArr.push(file.location));

    const item = await new Item({
      userID: req.user.userID,
      name,
      price,
      description,
      images: imgArr,
    });

    item.save();

    const response = { ...defaultResponseObject };
    response.data = item;
    res.status(201).json(response);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const buyItem = async (req, res) => {
  try {
    const { itemID } = req.body;

    const item = await Item.findById({ _id: mongoose.Types.ObjectId(itemID) });

    if (item.userID == req.user.userID) {
      return res.status(400).json("you are authorized to do that.");
    }

    const updatedItem = await Item.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(itemID) },
      { status: "sold", bought_by: req.user.userID },
      { new: true }
    );

    const response = { ...defaultResponseObject };
    response.data = updatedItem;
    res.status(201).json(response);
  } catch (e) {
    res.status(400).json(e.message);
  }
};

export const getMyItems = async (req, res) => {
  try {
    const { userID } = req.user;
    console.log(req.user);

    const myProducts = await Item.find({ userID });
    const response = { ...defaultResponseObject };
    response.data = myProducts;
    res.status(200).json(response);
  } catch (e) {
    const response = { ...defaultResponseObject };
    response.success = false;
    response.message = e.message || e;
    response.error = e;
    res.status(400).json(response);
  }
};
