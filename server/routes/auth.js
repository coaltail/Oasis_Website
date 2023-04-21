import express from "express";
import { verifyUserWithToken } from "../middleware/auth.js";
import { loginUser, registerNewUser } from "../controllers/auth.js"

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerNewUser);

export default router;