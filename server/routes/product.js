import express from "express";
import { createNewProduct, getAllProducts, getSingleProduct } from "../controllers/productController.js";
import { verifyAdmin, verifyUserWithToken } from "../middleware/auth.js";
import multer from "multer";
const router = express.Router();
// configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/create", verifyUserWithToken, upload.single("image"), createNewProduct);
router.get("/", getAllProducts);
router.get("/id", verifyUserWithToken, getSingleProduct);

export default router;