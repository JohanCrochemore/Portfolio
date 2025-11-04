import express from 'express';
import { protect, authorize } from "../middlewares/authMiddleware.js";


import {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectsByVisibility,
  getProjectsAccueil,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

// CRUD Projects
router.get("/visibility/:visibility", getProjectsByVisibility);
router.get('/', getAllProjects);
router.get('/accueil',getProjectsAccueil)
router.get('/:id', getProjectById);
router.post('/',protect, authorize(["admin"]), createProject);
router.put('/:id',protect, authorize(["admin"]), updateProject);
router.delete('/:id', protect, authorize(["admin"]),deleteProject);


export default router;
