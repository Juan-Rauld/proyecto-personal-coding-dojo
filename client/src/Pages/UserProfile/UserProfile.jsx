import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`http://ec2-18-191-114-127.us-east-2.compute.amazonaws.com:8080/api/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setUser(data);
      setPostCount(data.posts.length);
      setPosts(data.posts);
    })
    .catch(err => console.error(err));
  }, [id]);

  const deletePost = (postId) => {
    const token = localStorage.getItem('token');
    fetch(`http://ec2-18-191-114-127.us-east-2.compute.amazonaws.com:8080/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.ok) {
        setPosts(currentPosts => currentPosts.filter(post => post._id !== postId));
      } else {
        throw new Error('Failed to delete the post');
      }
    })
    .catch(err => console.error('Error:', err));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Nombre: {user.firstName}</p>
      <p>Apellido: {user.lastName}</p>
      <p>Total de posts: {postCount}</p>
      <p>Total de likes: {user.totalLikes}</p>
      <h2>Posts:</h2>
      {posts.map((post, index) => (
        <div key={index} className='card-shadow rounded-2xl p-5 border gap-5'>
          <p>{post.content}</p>
          {post.author === id && (  // Comprobar que el usuario es el autor del post
            <button onClick={() => deletePost(post._id)}>Eliminar</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserProfile;
