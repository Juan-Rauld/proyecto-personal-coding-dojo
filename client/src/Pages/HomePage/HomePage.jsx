import { useState, useEffect } from 'react';
import PostForm from '../../Components/PostForm/PostForm';
import Post from '../../Components/Posts/PostComp';
import './HomePage.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [activeModalPostId, setActiveModalPostId] = useState(null);

  // Función para recargar los posts desde el servidor
  const fetchPosts = () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
    fetch('http://localhost:8080/api/posts', { headers })
      .then(response => response.json())
      .then(data => {
        setPosts(data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPosts();  // Carga inicial de los posts
  }, []);

  const likePost = (postId, event) => {
    event.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    };
    fetch(`http://localhost:8080/api/posts/${postId}/like`, { method: 'POST', headers })
      .then(response => response.json())
      .then(data => {
        if (data && data.post && data.post.likes) {
          fetchPosts();  // Actualiza todos los posts después de dar like
        } else {
          console.error('Unexpected API response:', data);
        }
      }).catch(err => console.error(err));
  };

  const toggleModal = (postId) => {
    if (activeModalPostId === postId) {
      setActiveModalPostId(null);
    } else {
      setActiveModalPostId(postId);
    }
  };

  return (
    <div className='w-full flex flex-col gap-10'>
      <PostForm onAddPost={fetchPosts} />
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          onLike={likePost}
          toggleModal={toggleModal}
          isModalOpen={activeModalPostId === post._id}
        />
      ))}
    </div>
  );
};

export default HomePage;
