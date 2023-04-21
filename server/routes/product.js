import express  from "express";
import { createNewProduct, getAllProducts } from "../controllers/productController.js";
import { verifyUserWithToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyUserWithToken, createNewProduct);
router.get("/", getAllProducts);

export default router;