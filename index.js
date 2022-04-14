import express from "express";
import config from "./config/config.js";

import cors from "cors";

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  res.send("hello world");
});

app.listen(config.PORT, () => {
  console.log(`server is listening on port ${config.PORT}`);
});
