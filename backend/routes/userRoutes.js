import express from 'express';
import { getUserById, updateUser } from '../controllers/userController.js';

const router = express.Router();

// GET user by ID
router.get('/:id', getUserById);

// PUT user by ID
router.put('/:id', updateUser);

export default router;
