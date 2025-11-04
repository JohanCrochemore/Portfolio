import express from 'express';
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
router.get('/:id', getProjectById);
router.get('/accueil',getProjectsAccueil)
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);


export default router;
