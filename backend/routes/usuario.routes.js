import express from 'express';
import { register, deleteUser, createPost, getAllPosts, getPostsByAuthor, login, getUserById, likePost, unlikePost, getUserPosts, deletePost } from '../controllers/usuario.controller.js';
import jwt from 'jsonwebtoken';

const router = express.Router();





const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.userId = user.id; // assign only the id field to req.userId
        next();
    });
};

router.post('/api/register', register);
router.post('/api/login', login);
router.post('/api/posts', authenticateToken, createPost);
router.get('/api/posts', authenticateToken, getAllPosts);
router.get('/api/users/:userId/posts', authenticateToken, getPostsByAuthor);
router.get('/api/users/:userId/posts', authenticateToken, getUserPosts);
router.delete('/api/users/:userId', authenticateToken, deleteUser);
router.get('/api/users/:id', authenticateToken, getUserById);
router.post('/api/posts/:postId/like', authenticateToken, likePost);
router.delete('/api/posts/:postId/unlike', authenticateToken, unlikePost);
router.delete('/api/posts/:postId', authenticateToken, deletePost);


export default router;

