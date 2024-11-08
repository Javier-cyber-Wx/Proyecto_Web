import React, { useState } from 'react';
import { createPost } from './authService'; // Asegúrate de tener esta función en authService.js para hacer la solicitud al backend
import './style.css';

const CreatePostComponent = ({ onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleCreatePost = async () => {
        if (title && content) {
            try {
                const token = localStorage.getItem('token');
                const newPost = await createPost({ title, content }, token);
                onPostCreated(newPost); // Actualiza la lista de publicaciones en el componente principal
                setTitle('');
                setContent('');
            } catch (error) {
                console.error('Error al crear la publicación:', error);
            }
        } else {
            alert('Por favor completa todos los campos.');
        }
    };

    return (
        <div className="create-post-container">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título"
                className="post-input"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Contenido"
                className="post-textarea"
            />
            <button onClick={handleCreatePost} className="create-post-button">Crear Publicación</button>
        </div>
    );
};

export default CreatePostComponent;
