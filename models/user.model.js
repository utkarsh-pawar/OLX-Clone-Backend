import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    contact_no:{
      type:Number
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User =  mongoose.model("user", userSchema);

export default User;
