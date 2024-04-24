/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import PostForm from '../../Components/PostForm/PostForm'

const HomePage = () => {
  /*   const [petName, setPetName] = useState('');
   */


  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    fetch('http://localhost:8080/posts', { headers: headers }) // fetch by default makes a GET request y header:loquequiera :)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
      {posts.map((post, index) => (
        <div key={index}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.author && <p>Author: {post.author.firstName} {post.author.lastName}</p>}
        </div>
      ))}
      <PostForm
        
      ></PostForm>
    </div>
  );
}

export default HomePage