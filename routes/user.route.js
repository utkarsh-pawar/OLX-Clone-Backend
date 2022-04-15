import express from "express";
import * as userController from "../controllers/user.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

//verify-user
router.post("/verify", verifyToken,userController.verify);

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/additem", verifyToken, userController.addItem);

export default router;
