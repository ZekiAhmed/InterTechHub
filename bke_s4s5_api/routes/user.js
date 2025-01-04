import express from "express";
import {
  loginUser,
  myProfile,
  register,
  verifyUser,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/user/register", register);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/myprofile", verifyToken, myProfile);

export default router;
