import express from "express";
import * as itemController from "../controllers/item.js";
import upload from "../middleware/imageCloudUpload.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/getAllItems", itemController.getAllItems);
router.post("/getItem", itemController.getItem);
router.post(
  "/additem",
  verifyToken,
  upload.array("images"),
  itemController.addItem
);
router.post("/buyitem", verifyToken, itemController.buyItem);
router.post("/myitems", verifyToken, itemController.getMyItems);
router.post("/itemsbought", verifyToken, itemController.itemsBought);

export default router;
