import express from 'express';
import { protect, authorize } from "../middlewares/authMiddleware.js";


import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  getBlogPostByStatus,
  getLatestPosts,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/blogController.js';

const router = express.Router();

// CRUD Posts
router.get('/status/:status', getBlogPostByStatus);
router.get('/', getAllBlogPosts);
router.get('/latest',getLatestPosts)
router.get('/:id', getBlogPostById);
router.post('/',protect, authorize(["admin"]), createBlogPost);
router.put('/:id',protect, authorize(["admin"]), updateBlogPost);
router.delete('/:id',protect, authorize(["admin"]), deleteBlogPost);

export default router;
