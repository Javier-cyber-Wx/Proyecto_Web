import React, { useState } from 'react';
import { loginUser } from './authService'; // Cambia la ruta a './authService'
import './style.css'; // Asegúrate de importar los estilos

const LoginComponent = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(credentials);
            if (data.token) {
                localStorage.setItem('token', data.token); // Almacena el token
                setError(null);
                alert('Inicio de sesión exitoso');
                onLogin(); // Llama a la función onLogin al iniciar sesión
            } else {
                throw new Error('Token no recibido'); // Maneja el caso donde no se recibe token
            }
        } catch (err) {
            setError(err.message); // Maneja errores
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="small-button">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default LoginComponent;
