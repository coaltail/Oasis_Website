import express from 'express';
import { createNewOrder } from '../controllers/orderController.js';
import { verifyUserWithToken } from '../middleware/auth.js';
const router = express.Router();

router.post("/:id",verifyUserWithToken, createNewOrder);

export default router;
