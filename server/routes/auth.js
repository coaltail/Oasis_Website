import express from "express";
import { verifyUserWithToken } from "../middleware/auth.js";
import { loginUser, registerNewUser, loginAdmin, refreshToken } from "../controllers/auth.js"

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerNewUser);
router.post("/admin/login", loginAdmin);
router.get("/refresh", refreshToken);

export default router;