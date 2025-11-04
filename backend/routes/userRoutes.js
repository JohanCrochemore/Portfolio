import express from 'express';
import { protect, authorize } from "../middlewares/authMiddleware.js";


import { getUserById, updateUser } from '../controllers/userController.js';

const router = express.Router();

// GET user by ID
router.get('/:id', getUserById);

// PUT user by ID
router.put('/:id', protect, authorize(["admin"]), updateUser);

export default router;
