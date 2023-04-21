import express from 'express';
import { getCurrentUser } from '../controllers/usersController.js';
import { verifyUserWithToken } from '../middleware/auth.js';

const router = express.Router();


//Get routes

router.get("/:id", verifyUserWithToken, getCurrentUser);


//Post routes



//Update routes

export default router;