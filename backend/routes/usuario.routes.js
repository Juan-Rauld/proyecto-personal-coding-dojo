import express from 'express';
import { register, deleteUser, createPost, getAllPosts, getPostsByAuthor } from '../controllers/usuario.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/posts', createPost);
router.get('/posts', getAllPosts);
router.get('/users/:userId/posts', getPostsByAuthor);
router.delete('/users/:userId', deleteUser);

export default router;

