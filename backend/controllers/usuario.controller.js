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
            // La contraseña es correcta, puedes iniciar la sesión del usuario
            const token = jwt.sign(
                { id: user._id }, // payload
                'your_secret_key', // secret key (sí, super secreta haha)
                { expiresIn: '1h' } // options
            );
            res.json({ msg: "success!", user: user, token: token });
        } else {
            // La contraseña es incorrecta
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } else {
        // No se encontró ningún usuario con ese correo electrónico
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
    const userId = req.userId;  // Este debe ser un ObjectId válido obtenido del JWT

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
            author: userId,  // Asegúrate de que esto es un ObjectId válido
            likes: []        // Inicializa likes como un array vacío
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
            .populate('author', 'firstName'); // Selecciona solo firstName y lastName

        res.json(posts);
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

export { register, deleteUser, createPost, getAllPosts, getPostsByAuthor, login };
