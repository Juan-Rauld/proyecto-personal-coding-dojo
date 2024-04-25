/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from 'react'
import PostForm from '../../Components/PostForm/PostForm'
import { Link } from 'react-router-dom'
import Post from '../../Components/Posts/PostComp' // Importa el componente Post


const HomePage = () => {
  /*   const [petName, setPetName] = useState(''); */

  const [posts, setPosts] = useState([]);


const likePost = (postId, event) => {
  event.preventDefault();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
  fetch(`http://localhost:8080/posts/${postId}/like`, { method: 'POST', headers: headers })
    .then(response => response.json())
    .then(data => {
      // Verifica que la respuesta de la API tenga la estructura esperada
      if (data && data.likes) {
        // Actualiza solo la propiedad "likes" del post que se acaba de dar "like"
        setPosts(posts.map(post => post._id === postId ? { ...post, likes: data.likes } : post));
      } else {
        console.error('Unexpected API response:', data);
      }
    })
    .catch(err => console.error(err));
};
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
        <Post key={index} post={post} onLike={likePost} /> // Usa el componente Post para renderizar cada post
      ))}
      <PostForm />
    </div>
  );
}

export default HomePage;