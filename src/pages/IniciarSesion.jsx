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
    <div style={{ backgroundImage: 'url("./src/imagenes/fondo.jpg")', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>

        <div style={{ borderRadius: '20px 0px 0px 20px' , width: '500px',height: '500px',padding: 45 , color: '#73114B', fontSize: '20px', fontWeight: 'bold',  background: '#FFE6C9'}}>
          <h1>Facilitamos la organización de tus clases, exámanes y eventos académicos</h1>
        <div style={{ width: '300px',height: '300px', backgroundImage: 'url("./src/imagenes/estudio.png")', backgroundSize: 'cover', padding: 10}}>

        </div>
          <h2>Ingresa para programar tus actividades en los espacios disponibles de la universidad.</h2>
        </div>
        <div style={{ gap: '50px',borderRadius: '0px 20px 20px 0px' ,width: '500px',height: '500px', background: '#FFFFFF', padding: 60 , fontWeight: 'bold', fontSize: '20px', color: '#000000'}}>
          <h1>¡Bienvenidos al sistema de reserva de aulas!</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' ,fontSize: '15px', display: 'flex', flexDirection: 'column'}}>
            <label htmlFor="codigoSis">Correo institucional:</label>
            <input
              type="text"
              id="codigoSis"
              value={codigoSis}
              onChange={handleCodigoSisChange}
              required
              style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '1rem', fontSize: '15px', display: 'flex', flexDirection: 'column'}}>
            <label htmlFor="contrasena">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={handleContrasenaChange}
              required
              style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" style={{color: '#FFFFFF', background: '#7F265B',width: '380px', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}>Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default IniciarSesion;