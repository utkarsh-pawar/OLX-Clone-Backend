import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
  MY_AWS_ACCESS_KEY: process.env.MY_AWS_ACCESS_KEY,
};

export default config;
