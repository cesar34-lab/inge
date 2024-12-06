import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  // Estados para los valores de los campos
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Estados para los mensajes de error
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  // Función de validación en tiempo real para el campo de correo electrónico
  const validateUsername = (value) => {
    setUsername(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación simple de correo
    if (!emailPattern.test(value)) {
      setUsernameError('El correo no tiene un formato válido.');
    } else {
      setUsernameError('');
    }
  };

  // Función de validación en tiempo real para la contraseña
  const validatePassword = (value) => {
    setPassword(value);
    if (value.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres.');
    } else {
      setPasswordError('');
    }
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError(''); // Limpiar error general

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setGeneralError(errorData.error || 'Error al iniciar sesión.');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token); // Guardar el token en localStorage
      alert('Inicio de sesión exitoso');
      navigate('/home'); // Redirigir a otra página
    } catch (error) {
      setGeneralError('Error de conexión con el servidor.');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h1>Inicio de Sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Correo Electrónico</label>
          <input
            type="text"
            value={username}
            onChange={(e) => validateUsername(e.target.value)}
          />
          {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
          />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>

        {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
