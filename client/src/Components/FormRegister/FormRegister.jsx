/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setPasswordError('Las contraseñas deben coincidir');
    } else {
      setPasswordError('');
      // Aquí puedes manejar el envío del formulario, por ejemplo, llamando a una API
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword
      }
      try {
        const response = await fetch('http://ec2-18-119-162-193.us-east-2.compute.amazonaws.com:8080/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        console.log(response.data);
        alert('Usuario creado! 🎉')
        navigate('/user_profile');
      } catch (error) {
        console.error('¡Ups! Algo salió mal ' + error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        required
        placeholder="First Name"
      />
      <input
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        required
        placeholder="Last Name"
      />
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
        minLength="8"
        placeholder="Password"
      />
      <input
        type="password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        required
        minLength="8"
        placeholder="Confirm Password"
      />
      {passwordError && <p>{passwordError}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;