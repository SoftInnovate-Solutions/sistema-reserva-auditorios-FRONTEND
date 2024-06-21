import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const IniciarSesion = ({ login }) => {
  const [codigoSis, setCodigoSis] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
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

    const postData = async (url, body) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      return response.json().then(data => ({ ok: response.ok, data }));
    };

    try {
      const adminRes = await postData('http://127.0.0.1:5000/administrador/iniciar_sesion', {
        contrasenia_usu: contrasenia,
        nombre_usu: codigoSis
      });

      if (adminRes.ok && Object.keys(adminRes.data).length > 0) {
        login({ rol: "administrador" });
        sessionStorage.setItem('nombre_usuario', adminRes.data.nombre_usu);
        sessionStorage.setItem('cod_usuario', adminRes.data.cod_usuario);
        console.log("Ingresaste como Administrador");
      } else {
        const userRes = await postData('http://127.0.0.1:5000/final/iniciar_sesion', {
          contrasenia_usu: contrasenia,
          codigo_sis_fin: codigoSis
        });

        if (userRes.ok && Object.keys(userRes.data).length > 0) {
          login({ rol: "Usuario" });
          sessionStorage.setItem('nombre_usuario', userRes.data.nombre_usu);
          sessionStorage.setItem('cod_usuario', userRes.data.cod_usuario);
          sessionStorage.setItem('rol_usuario', userRes.data.cod_tipo_final);
          console.log("Ingresaste como Usuario");
        } else {
          setError('Credenciales incorrectas');
          setShowError(true);
          console.log("Credenciales incorrectas");
        }
      }
    } catch (err) {
      console.error("Error de red:", err);
      setError('Error de red');
      setShowError(true);
    }
  };


  const toggleMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
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
            <TextField
              type="text"
              id="codigoSis"
              value={codigoSis}
              onChange={handleCodigoSisChange}
              required
            />
          </div>

          <div style={{ marginBottom: '1rem', fontSize: '15px', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="contrasenia">Contraseña:</label>
            <TextField
              id="contrasenia"
              type={mostrarContrasenia ? 'text' : 'password'}
              value={contrasenia}
              onChange={handleContraseniaChange}
              required
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleMostrarContrasenia}
                      edge="end"
                    >
                      {mostrarContrasenia ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <button type="submit" style={{ color: '#FFFFFF', background: '#7F265B', width: '380px', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}>Ingresar</button>
          {showError && <div style={{ marginLeft: '80px', color: 'red', marginBottom: '0.5rem' }}>{error}</div>}

        </form>

      </div>
    </div>
  );
};

export default IniciarSesion;