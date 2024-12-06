import React, { useState } from 'react';
import styled from 'styled-components';

const SigIn = () => {
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let newErrors = { ...errors };
    if (name === 'email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      newErrors.email = 'Por favor ingresa un correo válido';
    } else if (name === 'password' && value.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    } else if (name === 'confirmPassword' && value !== formData.password) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setShowSuccessBanner(false);

    // Verificar si hay errores
    if (Object.keys(errors).length > 0) {
      alert('Por favor corrige los errores antes de enviar.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setGeneralError(errorData.error || 'Error al registrar el usuario.');
        return;
      }

      setShowSuccessBanner(true);
      setFormData({
        fullName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      setGeneralError('Error de conexión con el servidor.');
      console.error('Sign Up error:', error);
    }
  };

  return (
    <StyledWrapper>
      <h1>Registro</h1>
      {showSuccessBanner && <p style={{ color: 'green' }}>Usuario registrado exitosamente.</p>}
      {generalError && <p style={{ color: 'red' }}>{generalError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre Completo</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Apellido</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <div>
          <label>Confirmar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit">Registrar</button>
      </form>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: 
    radial-gradient(
      circle,
      rgb(170, 162, 162),
      #333 30%,
      rgba(88, 84, 84, 0.226) 0%
    ),
    radial-gradient(
      circle at 40px 40px,
      rgb(233, 228, 228),
      #333 30%,
      rgba(88, 84, 84, 0) 0%
    ),
    radial-gradient(
      circle at 600px 200px,
      rgb(233, 228, 228),
      #333 10%,
      rgba(88, 84, 84, 0) 0%
    ),
    radial-gradient(
      circle at 800px 100px,
      rgb(233, 228, 228),
      #333 10%,
      rgba(88, 84, 84, 0) 0%
    ),
    radial-gradient(
      circle at 700px 500px,
      rgb(233, 228, 228),
      #333 2%,
      rgba(88, 84, 84, 0.123) 0%
    ),
    radial-gradient(
      circle at 200px 400px,
      rgb(233, 228, 228),
      #333 1%,
      rgba(88, 84, 84, 0) 0%
    ),
    radial-gradient(
      circle at 300px 700px,
      rgb(233, 228, 228),
      #333 15%,
      rgba(88, 84, 84, 0) 0%
    ),
    radial-gradient(
      circle at 900px 500px,
      rgb(233, 228, 228),
      #333 20%,
      rgba(88, 84, 84, 0) 0%
    ),
    radial-gradient(
      circle at 650px 400px,
      rgb(233, 228, 228),
      #333 10%,
      rgba(88, 84, 84, 0) 0%
    ),
    radial-gradient(
      circle at 600px 600px,
      rgb(233, 228, 228),
      #333 1%,
      rgba(88, 84, 84, 0.959) 0%
    );
  background-color: lightblue; /* color de fondo de reserva */
  padding: 10px;
  box-sizing: border-box;
  .success-banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #28a745; /* Verde para éxito */
    color: white;
    text-align: center;
    padding: 15px;
    font-size: 1.2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 999;
    transition: opacity 0.3s ease;
  }



  .container {
    position: relative;
    max-width: 500px;
    width: 100%;
    background: #2f2f32 ;
    padding: 25px;
    border-radius: 25px;
    box-shadow: 0 0  55vw rgba(212, 255, 252, 1);
  }

  .container header {
    font-weight: 600;
    text-align: center;
  }

  .form {
    margin-top: 15px;
    background-color: #344f5e ;
    box-shadow:0 0  2vw rgba(188, 188, 255, 1);
    height:70vh
  }

  .form .input-box {
    width: 90%;
    margin-top: 10px;
  }

  .input-box label {
    color: #000;
  }

  .form :where(.input-box input, .select-box) {
    position: relative;
    height: 35px;
    width: 100%;
    outline: none;
    font-size: 1rem;
    color: #808080;
    margin-top: 5px;
    border: 1px solid #EE4E34;
    border-radius: 6px;
    padding: 0 15px;
    background: #FCEDDA;
  }

  .input-box input:focus {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }

  .form .column {
    display: flex;
    column-gap: 15px;
  }

  .form .gender-box {
    margin-top: 10px;
  }

  .form :where(.gender-option, .gender) {
    display: flex;
    align-items: center;
    column-gap: 50px;
    flex-wrap: wrap;
  }

  .form .gender {
    column-gap: 5px;
  }

  .gender input {
    accent-color: #EE4E34;
  }

  .form :where(.gender input, .gender label) {
    cursor: pointer;
  }

  .gender label {
    color: #000;
  }

  .address :where(input, .select-box) {
    margin-top: 10px;
  }

  .select-box select {
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    color: #808080;
    font-size: 1rem;
    background: #FCEDDA;
  }

  .form button {
    height: 40px;
    width: 100%;
    color: #000;
    font-size: 1rem;
    font-weight: 400;
    margin-top: 15px;
    border: none; 
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #EE4E34;
  }

  .form button:hover {
    background: #EE3E34;
  } 
    .title {
  --blur: 1.75rem;
  --box-blur: calc(0.5 * var(--blur));
  --glow: var(--color);
  --height:5vw;
  --width:37.5vw;
  --font-size:3vw;  

  align-items: center;
  border-radius: 12px;
  border: 4px solid currentColor;
  box-shadow: 
    /* --- "glass" tube --- */
    /* inside */ inset 0 0 0 2px
      rgba(0, 0, 0, 0.15),
    /* outside */ 0 0 0 2px rgba(0, 0, 0, 0.15),
    /* --- glow --- */ /* inside */ inset 0 0 var(--box-blur) var(--glow),
    /* outside */ 0 0 var(--box-blur) var(--glow);
  color: var(--color, white);
  display: inline-flex;
  flex-direction: column;
  font-family: system-ui, sans-serif;
  height: var(--height);
  justify-content: space-around;
  padding: 1rem;
  width: var(--width);
  font-size:var(--font-size);
}
  .title.h1 {
  --color: #00ffff;
  filter: saturate(200%);
  cursor: pointer;
}

.title.h1:hover {
  filter: brightness(120%) drop-shadow(0 0 10px var(--glow));
}

  .error {
    color: red;
    font-size: 0.9rem;
  }

 

`;
export default SigIn;

// Estilos (ejemplo)






