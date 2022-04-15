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

export const buyItem = async (req, res) => {
  try {
    const { itemID } = req.body;

    const item = await Item.findById({ _id: mongoose.Types.ObjectId(itemID) });

    if(item.userID == req.user.userID){
        return res.status(400).json("you are authorized to do that.")
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
