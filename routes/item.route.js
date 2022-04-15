import express from "express";
import * as itemController from "../controllers/item.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/getAllItems", itemController.getAllItems);
router.post("/additem", verifyToken, itemController.addItem);
router.post("/buyitem", verifyToken, itemController.buyItem);
export default router;
