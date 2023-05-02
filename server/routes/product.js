import express from "express";
import { createNewProduct, getAllProducts, getSingleProduct } from "../controllers/productController.js";
import { verifyAdmin, verifyUserWithToken } from "../middleware/auth.js";
import multer from "multer";
const router = express.Router();
// configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../oasis-app/src/assets/productPhotos/');
    },
    filename: function (req, file, cb) {
        let newFileName = Date.now() + '-' + file.originalname;
        cb(null, newFileName);
    }
});
const upload = multer({ storage });
router.post("/create", verifyUserWithToken, upload.single("image"), createNewProduct);
router.get("/", getAllProducts);
router.get("/:id", verifyUserWithToken, getSingleProduct);

export default router;