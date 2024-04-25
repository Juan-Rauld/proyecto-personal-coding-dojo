import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

useEffect(() => {
  const token = localStorage.getItem('token'); // o donde sea que estés guardando el token
  fetch(`http://ec2-18-119-162-193.us-east-2.compute.amazonaws.com:8080/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setUser(data);
      setPosts(data.posts);
    })
    .catch(err => console.error(err));
}, [id]);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>User ID: {user._id}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <h2>Posts:</h2>
      {posts.map((post, index) => (
        <div key={index}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default UserProfile;