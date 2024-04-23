import User from '../models/usuario.model.js';

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


const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findOneAndDelete({ _id: userId });
        if (user) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


const createPost = async (req, res) => {
    const { userId, content } = req.body;
    try {
        const user = await User.findOne({ _id: userId });
        if (user) {
            const post = { content };
            user.posts.push(post);
            await user.save();
            res.status(201).json(post);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err); // Imprime el error en la consola
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllPosts = async (req, res) => {
    const users = await User.find({});
    const posts = users.flatMap(user => user.posts);
    res.json(posts);
};

const getPostsByAuthor = async (req, res) => {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId });
    if (user) {
        res.json(user.posts);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};



export { register, deleteUser, createPost, getAllPosts, getPostsByAuthor };
