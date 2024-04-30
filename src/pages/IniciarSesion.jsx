import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IniciarSesion = ({ login }) => {
  const [codigoSis, setCodigoSis] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleCodigoSisChange = (e) => setCodigoSis(e.target.value);
  const handleContrasenaChange = (e) => setContrasena(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(codigoSis, '--------',contrasena)
    login({ codigoSis, contrasena });
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '300px' , background: '#D6D5D9'}}>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="codigoSis">Código SIS:</label>
            <input
              type="text"
              id="codigoSis"
              value={codigoSis}
              onChange={handleCodigoSisChange}
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="contrasena">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={handleContrasenaChange}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default IniciarSesion;
// 