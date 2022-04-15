import express from "express";
import config from "./config/config.js";
import morgan from "morgan";

import cors from "cors";
import db from "./database/db.js";
import userRoute from "./routes/user.route.js";
import itemRoute from "./routes/item.route.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"))

db();

app.get("/", async (req, res) => {
  res.send("hello world");
});

app.use("/user", userRoute);
app.use("/item",itemRoute)

app.listen(config.PORT, () => {
  console.log(`server is listening on port ${config.PORT}`);
});
