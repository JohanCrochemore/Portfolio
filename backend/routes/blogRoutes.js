import express from 'express';
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  getBlogPostByStatus,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/blogController.js';

const router = express.Router();

// CRUD Posts
router.get('/status/:status', getBlogPostByStatus);
router.get('/', getAllBlogPosts);
router.get('/:id', getBlogPostById);
router.post('/', createBlogPost);
router.put('/:id', updateBlogPost);
router.delete('/:id', deleteBlogPost);

export default router;
