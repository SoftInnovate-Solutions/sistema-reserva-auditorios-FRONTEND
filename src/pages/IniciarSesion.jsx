import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IniciarSesion = ({login}) => {
  const [codigoSis, setCodigoSis] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleCodigoSisChange = (e) => setCodigoSis(e.target.value);
  const handleContraseniaChange = (e) => setContrasenia(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(codigoSis, '--------',contrasenia)
    // login({ codigoSis, contrasenia });

    setError('Credenciales incorrectas');
    setShowError(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:5000/administrador/iniciar_sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contrasenia_usu: contrasenia,
          nombre_usu: codigoSis
        }),
      });
      const data = await res.json();

      if (res.ok && Object.keys(data).length > 0) {
        login({ rol:"administrador" });
        localStorage.setItem('nombre_usuario', data.nombre_usu)
        localStorage.setItem('cod_usuario', data.cod_usuario)
        console.log("Ingresate como Administrador");
      } else {
        try {
          const res = await fetch('http://127.0.0.1:5000/final/iniciar_sesion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contrasenia_usu: contrasenia,
              codigo_sis_fin: codigoSis
            }),
          });
          const data = await res.json();

          if (res.ok && Object.keys(data).length > 0) {
            login({ rol: "Usuario" });
            localStorage.setItem('nombre_usuario', data.nombre_usu)
            localStorage.setItem('cod_usuario', data.cod_usuario)
            console.log("Ingresaste como usuario");
          } else {
            setError('Credenciales incorrectas');
            setShowError(true);
            console.log("Credenciales incorrectos");
          }
        } catch (err) {
          console.log("Error de red");
        }
      }
    } catch (err) {
      console.log("Error de red");
    }
  };


  return (
    <div style={{ backgroundImage: 'url("./src/imagenes/fondo.jpg")', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>

      <div style={{ borderRadius: '20px 0px 0px 20px', width: '500px', height: '500px', padding: 45, color: '#73114B', fontSize: '20px', fontWeight: 'bold', background: '#FFE6C9' }}>
        <h1>Facilitamos la organización de tus clases, exámanes y eventos académicos</h1>
        <div style={{ width: '300px', height: '300px', backgroundImage: 'url("./src/imagenes/estudio.png")', backgroundSize: 'cover', padding: 10 }}>

        </div>
        <h2>Ingresa para programar tus actividades en los espacios disponibles de la universidad.</h2>
      </div>
      <div style={{ gap: '50px', borderRadius: '0px 20px 20px 0px', width: '500px', height: '500px', background: '#FFFFFF', padding: 60, fontWeight: 'bold', fontSize: '20px', color: '#000000' }}>
        <h1>¡Bienvenidos al sistema de reserva de aulas!</h1>

        <form onSubmit={handleLogin}>
          <div style={{ marginTop: '40px', marginBottom: '1rem', fontSize: '15px', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="codigoSis">Código SIS:</label>
            <input
              type="text"
              id="codigoSis"
              value={codigoSis}
              onChange={handleCodigoSisChange}
              required
              style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '1rem', fontSize: '15px', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="contrasenia">Contraseña:</label>
            <input
              type="password"
              id="contrasenia"
              value={contrasenia}
              onChange={handleContraseniaChange}
              required
              style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" style={{ color: '#FFFFFF', background: '#7F265B', width: '380px', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}>Ingresar</button>
          {showError && <div style={{marginLeft: '80px', color: 'red', marginBottom: '0.5rem' }}>{error}</div>}
        </form>

      </div>
    </div>
  );
};

export default IniciarSesion;