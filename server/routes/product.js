import express  from "express";
import { createNewProduct, getAllProducts, getSingleProduct } from "../controllers/productController.js";
import { verifyAdmin, verifyUserWithToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyAdmin, createNewProduct);
router.get("/", getAllProducts);
router.get("/id", verifyUserWithToken, getSingleProduct);

export default router;