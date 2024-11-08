import React, { useState, useEffect } from 'react';
import { getPosts, likePost, addComment, deletePost, createPost } from './authService';
import './style.css';

const PostsComponent = () => {
    const [posts, setPosts] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [commentVisible, setCommentVisible] = useState({});
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await getPosts(token);
            setPosts(postsData);
        };
        fetchPosts();
    }, [token]);

    const handleLike = async (postId) => {
        await likePost(postId, token);
    };

    const handleComment = async (postId) => {
        if (!commentText) return;
        const response = await addComment(postId, commentText, token);
        if (response) {
            setCommentText('');
        }
    };

    const toggleCommentSection = (postId) => {
        setCommentVisible(prev => ({ ...prev, [postId]: !prev[postId] }));
    };

    const handleDelete = async (postId) => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar esta publicación?");
        if (confirmDelete) {
            const response = await deletePost(postId, token);
            if (response) {
                setPosts(posts.filter(post => post._id !== postId));
                console.log(`Publicación eliminada: ${postId}`);
            } else {
                console.error('Error al eliminar la publicación');
            }
        }
    };

    const handleCreatePost = async () => {
        if (newPostTitle && newPostContent) {
            try {
                const newPost = await createPost({ title: newPostTitle, content: newPostContent }, token);
                setPosts([newPost, ...posts]);
                setNewPostTitle('');
                setNewPostContent('');
            } catch (error) {
                console.error('Error al crear la publicación:', error);
            }
        } else {
            alert('Por favor completa todos los campos.');
        }
    };

    return (
        <div className="posts-container">
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
                posts.map((post, index) => (
                    <div className="post-card" key={index}>
                        <div className="post-header">
                            <h3 className="post-title">{post.title}</h3>
                            <span className="post-author">
                                @{post.author && post.author.username ? post.author.username : "Usuario desconocido"}
                             </span>
                            <button onClick={() => handleDelete(post._id)} className="delete-button">🗑️</button>
                        </div>
                        <p className="post-content">{post.content}</p>
                        <div className="post-actions">
                            <button onClick={() => handleLike(post._id)} className="like-button">👍</button>
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
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p className="no-posts">No hay publicaciones disponibles</p>
            )}
        </div>
    );
};

export default PostsComponent;
