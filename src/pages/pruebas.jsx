import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const FormularioRegistro = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nombre.trim() !== '') {
      setMensaje(`¡Hola, ${nombre}! Tu nombre ha sido registrado.`);
    } else {
      setMensaje('Por favor, ingresa tu nombre.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Registro de Nombre
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          value={nombre}
          onChange={handleNombreChange}
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Registrar Nombre
        </Button>
      </form>
      {mensaje && (
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {mensaje} 
        </Typography>
      )}
    </Box>
  );
};

export default FormularioRegistro;
