import express from 'express';
import { protect, authorize } from "../middlewares/authMiddleware.js";


import {
  createSkills,
  getAllSkills,
  getSkillsById,
  updateSkills,
  deleteSkills
} from '../controllers/skillController.js';

const router = express.Router();

// CRUD Skills
router.get('/', getAllSkills);
router.get('/:id', getSkillsById);
router.post('/',protect, authorize(["admin"]), createSkills);
router.put('/:id',protect, authorize(["admin"]), updateSkills);
router.delete('/:id', protect, authorize(["admin"]),deleteSkills);

export default router;
