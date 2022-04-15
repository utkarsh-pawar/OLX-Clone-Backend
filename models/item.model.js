import mongoose from "mongoose";

const { Schema } = mongoose;

const itemSchema = new mongoose.Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["sold", "unsold"],
      default: "unsold",
    },
    bought_by: {
      type: Schema.Types.ObjectId,
      ref:"user"
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("item", itemSchema);

export default Item;
