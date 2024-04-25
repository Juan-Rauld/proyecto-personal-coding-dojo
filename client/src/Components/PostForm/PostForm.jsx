/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {

    const [user, setUser] = useState({}); // Inicializa el estado del usuario

    const [form, setForm] = useState({
        content: '',
    });

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            content: form.content,
        }

        const response = await fetch('http://ec2-18-119-162-193.us-east-2.compute.amazonaws.com:8080/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),

            },
            body: JSON.stringify(payload),
        })
        if (response.status === 201) {
            navigate('/');
        } else {
            console.log(payload)
            console.log(form.content)
            console.log(user)
            alert('Nope');
        }
    }

    /* router.post('/posts', authenticateToken, createPost); */

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Postea algo!"
                    type='text'
                    name='content'
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default PostForm;