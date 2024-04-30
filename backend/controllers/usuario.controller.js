import { User, Post } from '../models/usuario.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const register = (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        res.status(400).json({ message: 'Password must match confirm password' });
        return;
    }
    const user = new User({ firstName, lastName, email, password });
    user
        .save()
        .then(() => {
            res.json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            const token = jwt.sign(
                { id: user._id },
                'your_secret_key',
                { expiresIn: '1h' }
            );
            res.json({ msg: "success!", user: user, token: token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } else {
        res.status(404).json({ message: 'Invalid email or password' });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findOneAndDelete({ _id: userId });
        if (user) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found - DELETE' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error - DELETE' });
    }
};

const createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newPost = new Post({
            content: content,
            author: userId,
            likes: []
        });
        await newPost.save();
        user.posts.push(newPost);
        await user.save();
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};

const getUserPosts = async (req, res, next) => {
    const userId = req.params.userId;

    Post.find({ author: userId })
        .populate('likes', 'firstName') // Modify this line
        .then(posts => {
            // Add a likeCount and likedBy fields to each post
            const postsWithLikes = posts.map(post => {
                const likedBy = post.likes.filter(user => user !== null).map(user => user.firstName);
                return {
                    ...post._doc,
                    likeCount: likedBy.length,
                    likedBy
                };
            });
            res.json(postsWithLikes);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'An error occurred while retrieving posts.' });
        });
};

/* const createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.userId; // Usar directamente
    try {
        const user = await User.findOne({ _id: userId });
        if (user) {
            const post = { content, author: userId, likes: [userId] };
            user.posts.push(post);
            await user.save();
            res.status(201).json(post);
        } else {
            res.status(404).json({ message: 'User not found - CREATE' });
        }
    } catch (err) {
        console.error(err); // Imprime el error en la consola
        res.status(500).json({ message: 'Internal server error - CREATE' });
    }
};
 */

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate('author', 'firstName lastName') // Selecciona solo firstName y lastName del autor
            .populate('likes', 'firstName lastName'); // También debes poblar los datos de 'likes' con los nombres de los usuarios

        // Construye un nuevo array con la información de los usuarios que dieron like
        const postsWithUserLikes = posts.map(post => ({
            ...post._doc,
            likes: post.likes.map(user => {
                return { _id: user._id, firstName: user.firstName, lastName: user.lastName }
            })
        }));

        res.json(postsWithUserLikes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los posts');
    }
};


const getPostsByAuthor = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (user) {
        res.json(user.posts);
    } else {
        res.status(404).json({ message: 'User not found - ID X USUARIO' });
    }
};


const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).populate('posts');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: 'User has already liked this post' });
        }

        post.likes.push(userId);
        await post.save();

        const updatedPost = await Post.findById(postId)
            .populate('likes', 'firstName lastName'); // Poblar los 'likes' con los nombres de usuario

        res.json({ message: 'Post liked successfully', post: updatedPost });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};


const unlikePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId; // Este debe ser un ObjectId válido obtenido del JWT

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Comprueba si el usuario ya ha dado "like" al post
        const index = post.likes.indexOf(userId);
        if (index === -1) {
            return res.status(400).json({ message: 'User has not liked this post' });
        }

        post.likes.splice(index, 1);
        await post.save();

        res.json({ message: 'Like removed successfully', post: post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};


const deletePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: 'User not authorized to delete this post' });
        }

        await Post.deleteOne({ _id: postId });
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
};


export { register, deleteUser, createPost, getAllPosts, getPostsByAuthor, login, getUserById, likePost, unlikePost, getUserPosts, deletePost };