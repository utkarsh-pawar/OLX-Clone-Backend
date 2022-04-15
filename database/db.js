import mongoose from "mongoose";
import config from "../config/config.js";

const db = () => {
  mongoose
    .connect(config.MONGO_URI)
    .then(() => {
      console.log("Database connected");
    })
    .catch((e) => {
      console.log(e.message);
      process.exit();
    });
};

export default db;
