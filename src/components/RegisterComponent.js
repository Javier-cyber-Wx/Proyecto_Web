// src/components/RegisterComponent.js
import React, { useState } from 'react';
import { registerUser } from './authService'; // Cambia la ruta a './authService'
import './style.css'; // Importa el archivo CSS

const RegisterComponent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const userData = { username, email, password };

        try {
            const result = await registerUser(userData);
            console.log('Usuario registrado:', result);
            // Aquí puedes manejar la respuesta, como redirigir o mostrar un mensaje
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleRegister}>
                <h2 style={{ textAlign: 'center' }}>Registro</h2>

                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterComponent;
