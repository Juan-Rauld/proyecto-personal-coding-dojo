/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './../../Contexts/UserContext';



const LoginForm = () => { // Elimina setUser de las props
  const { setUser } = useContext(UserContext); // Obtiene setUser del contexto
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, llamando a una API
    const payload = {
      email: form.email,
      password: form.password
    }
    const response = await fetch('http://ec2-18-119-162-193.us-east-2.compute.amazonaws.com:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (response.status === 200) {
      const data = await response.json();
      setUser(data.user); // Aquí es donde actualizas el estado del usuario
      console.log(data);
      const token = data.token;
      localStorage.setItem('token', token)
      const storedToken = localStorage.getItem('token');
      console.log('Stored token:', storedToken);
      navigate('/');
    } else {
      alert('Constraseña o email incorrecto');
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;