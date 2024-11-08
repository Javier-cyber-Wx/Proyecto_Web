const API_BASE_URL = 'http://localhost:3001/api';

// Función para manejar errores de respuesta
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
};

// Función de registro que llama al endpoint del controlador
export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    return handleResponse(response);
};

// Función de inicio de sesión que llama al endpoint del controlador
export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });
    return handleResponse(response);
};

// Crear una publicación
export const createPost = async (postData, token) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
    });
    return handleResponse(response);
};

// Dar like a una publicación
export const likePost = async (postId, token) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return handleResponse(response);
};

// Obtener publicaciones
export const getPosts = async (token) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return handleResponse(response);
};

// Agregar un comentario
export const addComment = async (postId, commentData, token) => {
    const response = await fetch(`${API_BASE_URL}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ post: postId, content: commentData }), // Cambiado `postId` a `post`
    });
    return handleResponse(response);
};

// Función para eliminar una publicación
export const deletePost = async (postId, token) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return handleResponse(response);
};
