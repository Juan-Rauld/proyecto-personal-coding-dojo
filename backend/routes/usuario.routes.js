import express from 'express';
import { register, deleteUser, createPost, getAllPosts, getPostsByAuthor, login } from '../controllers/usuario.controller.js';
import jwt from 'jsonwebtoken';

const router = express.Router();



const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.userId = user.id;
        next();
    });
};

router.post('/register', register);
router.post('/login', login);
router.post('/posts', authenticateToken, createPost);
router.get('/posts', authenticateToken, getAllPosts);
router.get('/users/:userId/posts', authenticateToken, getPostsByAuthor);
router.delete('/users/:userId', authenticateToken, deleteUser);

export default router;

