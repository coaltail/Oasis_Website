import express from "express";
import { verifyUserWithToken } from "../middleware/auth.js";
import { loginUser, registerNewUser, loginAdmin } from "../controllers/auth.js"

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerNewUser);
router.post("/login/__admin__", loginAdmin);

export default router;