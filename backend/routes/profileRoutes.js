import express from 'express';
import { protect, authorize } from "../middlewares/authMiddleware.js";


import {
    getProfile,
    updateProfile
} from '../controllers/profileController.js';

const router = express.Router();

// CRUD Users
router.get('/', getProfile);
router.put('/',protect, authorize(["admin"]), updateProfile);
export default router;
