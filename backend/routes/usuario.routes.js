import express from 'express';
import { createPost, getAllPosts, getPostsByAuthor } from '../controllers/usuario.controller.js';

const router = express.Router();

router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/users/:userId/posts', getPostsByAuthor);

export default router;

