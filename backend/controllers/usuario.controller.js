import User from '../models/usuario.model.jscomo';

const createPost = async (req, res) => {
    const { userId, content } = req.body;
    const user = await User.findOne({ _id: userId });
    if (user) {
        const post = { content };
        user.posts.push(post);
        await user.save();
        res.status(201).json(post);
    } else {
        res.status(404).json({ message: 'User not found' });
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

export { createPost, getAllPosts, getPostsByAuthor };