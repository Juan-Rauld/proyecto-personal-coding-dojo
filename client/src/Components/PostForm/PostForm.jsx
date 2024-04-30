/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostForm = ({ onAddPost }) => {
    const [form, setForm] = useState({
        content: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            content: form.content,
        }

        const response = await fetch('http://ec2-18-191-114-127.us-east-2.compute.amazonaws.com:8080/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(payload),
        });

        if (response.status === 201) {
            // Llamar a onAddPost para actualizar la lista de posts
            onAddPost();
            // Limpiar el formulario
            setForm({ content: '' });  // Restablece el estado del formulario
            navigate('/'); // Opcional: redirigir si es necesario
        } else {
            console.error('Failed to create post', payload);
            alert('Failed to create post');
        }
    };

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div className='grid grid-cols-3 gap-4 grid-rows-[auto,1fr] '>
            <form onSubmit={handleSubmit} className='col-span-2 col-start-2 overflow-auto'>
                <textarea
                    className='col-span-2 w-full card-shadow rounded-2xl p-5 border'
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Post something!"
                    name='content'
                />
                <button className='py-2 text-sm font-medium px-4 rounded-lg ml-auto bg-teal-600 text-[#CBFBF1]' type="submit">Post</button>
            </form>
        </div>
    );
};

export default PostForm;
