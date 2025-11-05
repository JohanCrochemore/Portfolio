<<<<<<< HEAD
import express from 'express';
import { protect, authorize } from "../middlewares/authMiddleware.js";


import { getUserById, updateUser } from '../controllers/userController.js';

const router = express.Router();

// GET user by ID
router.get('/:id', getUserById);

// PUT user by ID
router.put('/:id', protect, authorize(["admin"]), updateUser);

export default router;
=======
import express from 'express';
import { protect, authorize } from "../middlewares/authMiddleware.js";


import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// CRUD Users
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/',protect, authorize(["admin"]), createUser);
router.put('/:id',protect, authorize(["admin"]), updateUser);
router.delete('/:id', protect, authorize(["admin"]),deleteUser);

export default router;
>>>>>>> main
