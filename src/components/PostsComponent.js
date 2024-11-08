import React, { useState, useEffect } from 'react';
import { getPosts, likePost, addComment, deletePost, createPost, getComments } from './authService';
import './style.css';

const PostsComponent = () => {
    const [posts, setPosts] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [commentVisible, setCommentVisible] = useState({});
    const [comments, setComments] = useState({}); // Estado para almacenar los comentarios por publicación
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await getPosts(token);
            // Agrega el contador de "likes" desde el backend
            setPosts(postsData);
        };
        fetchPosts();
    }, [token]);

    const handleLike = async (postId) => {
        // Llamamos a la API para alternar el "like"
        const response = await likePost(postId, token);
        if (response && response.likes) {
            // Actualiza el contador de likes con la respuesta del backend
            const updatedPosts = posts.map(post => {
                if (post._id === postId) {
                    return { ...post, likesCount: response.likes }; // Actualiza con los nuevos likes
                }
                return post;
            });
            setPosts(updatedPosts);
        }
    };

    const handleComment = async (postId) => {
        if (!commentText) return;
        const response = await addComment(postId, commentText, token);
        if (response) {
            setCommentText('');
            fetchComments(postId); // Actualiza los comentarios
        }
    };

    const fetchComments = async (postId) => {
        try {
            const commentsData = await getComments(postId, token);
            setComments(prev => ({ ...prev, [postId]: commentsData }));
        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
        }
    };

    const toggleCommentSection = (postId) => {
        setCommentVisible(prev => ({ ...prev, [postId]: !prev[postId] }));
        if (!comments[postId]) {  // Solo carga los comentarios si aún no se han cargado
            fetchComments(postId);
        }
    };

    const handleDelete = async (postId) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta publicación?");
        if (confirmDelete) {
            const response = await deletePost(postId, token);
            if (response) {
                setPosts(posts.filter(post => post._id !== postId));
            }
        }
    };

    const handleCreatePost = async () => {
        if (newPostTitle && newPostContent) {
            const newPost = await createPost({ title: newPostTitle, content: newPostContent }, token);
            setPosts([newPost, ...posts]);
            setNewPostTitle('');
            setNewPostContent('');
        }
    };

    return (
        <div className="posts-container">
            <h1 className='Titulo'>Mi Blog de diversion y Compañia</h1>
            <div className="create-post-container">
                <input
                    type="text"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="Título de la publicación"
                    className="post-input"
                />
                <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Contenido de la publicación"
                    className="post-textarea"
                />
                <button onClick={handleCreatePost} className="create-post-button">Crear Publicación</button>
            </div>

            {posts.length > 0 ? (
                posts.map((post) => (
                    <div className="post-card" key={post._id}>
                        <div className="post-header">
                            <h3 className="post-title">{post.title}</h3>
                            <span className="post-author">@{post.author.username}</span>
                            <button onClick={() => handleDelete(post._id)} className="delete-button">🗑️</button>
                        </div>
                        <p className="post-content">{post.content}</p>
                        <div className="post-actions">
                            <button onClick={() => handleLike(post._id)} className="like-button">
                                👍 {post.likesCount}
                            </button>
                            <button onClick={() => toggleCommentSection(post._id)} className="comment-button">💬</button>
                        </div>

                        {commentVisible[post._id] && (
                            <div className="comment-section">
                                <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Escribe un comentario..."
                                    className="comment-input"
                                />
                                <button onClick={() => handleComment(post._id)} className="submit-comment-button">Enviar</button>

                                {/* Mostrar los comentarios */}
                                {comments[post._id] && comments[post._id].length > 0 ? (
                                    <div className="comments-list">
                                        {comments[post._id].map((comment) => (
                                            <div className="comment" key={comment._id}>
                                                <p><strong>{comment.user.username}:</strong> {comment.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No hay comentarios.</p>
                                )}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No hay publicaciones disponibles</p>
            )}
        </div>
    );
};

export default PostsComponent;
