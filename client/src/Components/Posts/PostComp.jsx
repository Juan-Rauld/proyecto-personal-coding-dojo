/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Post.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post, onLike }) => (
  <div>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
    {post.author && <p>Author: {post.author.firstName} {post.author.lastName}</p>}
    <Link to={`/user_profile/${post.author._id}`}>este es el id de usuario que creo: {post.author._id}</Link>
    <button onClick={(event) => onLike(post._id, event)}>Like</button>
    <p>{post.likes.length} likes</p>
  </div>
);

export default Post;