import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectsByVisibility,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

// CRUD Projects
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.get("/visibility/:visibility", getProjectsByVisibility);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
