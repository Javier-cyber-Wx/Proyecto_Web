// src/App.js
import React, { useState, useEffect } from 'react';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import PostsComponent from './components/PostsComponent';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Leer el estado de autenticación desde Local Storage
        return localStorage.getItem('isAuthenticated') === 'true';
    });
    const [showLogin, setShowLogin] = useState(false);

    // Función para manejar autenticación
    const handleAuthentication = () => {
        setIsAuthenticated(true); // Cambia el estado a autenticado
        localStorage.setItem('isAuthenticated', 'true'); // Almacena en Local Storage
    };

    const toggleComponent = () => {
        setShowLogin((prev) => !prev);
    };

    // Opcional: limpiar Local Storage al cerrar sesión
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}></h1>
            {/* Condicional para mostrar autenticación o publicaciones */}
            {!isAuthenticated ? (
                <>
                    {showLogin ? (
                        <LoginComponent onLogin={handleAuthentication} />
                    ) : (
                        <RegisterComponent onRegister={handleAuthentication} />
                    )}
                    <button onClick={toggleComponent} style={styles.toggleButton}>
                        {showLogin ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </>
            ) : (
                <>
                    <PostsComponent />
                    <button onClick={handleLogout} style={styles.toggleButton}>Cerrar sesión</button>
                </>
            )}
            <footer style={styles.footer}>
                <p>© 2024 Tu Compañía</p>
            </footer>
        </div>
    );
};

// Estilos
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        marginBottom: '20px',
        color: '#333',
    },
    toggleButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    footer: {
        marginTop: '20px',
        fontSize: '14px',
        color: '#888',
    },
};

export default App;
