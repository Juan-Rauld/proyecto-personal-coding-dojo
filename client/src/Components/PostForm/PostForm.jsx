/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {

    const [form, setForm] = useState({
        content: '',
    });

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            content: form.content,
        }

        const response = await fetch('http://localhost:8080/posts', {
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

            alert('Nope');
        }
    }

    /*         router.post('/posts', authenticateToken, createPost);
     */

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