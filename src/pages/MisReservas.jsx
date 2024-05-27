import React, { useState, useEffect } from 'react';
import { Typography, useTheme, Grid, Box, Button } from '@mui/material';
import dayjs from 'dayjs';

const MisReservas = () => {
  const [mensaje, setMensaje] = useState('');
  const theme = useTheme();

  const verificarPeriodoReserva = () => {
    const rolUsuario = localStorage.getItem('saveRol');
    const storedPeriodos = localStorage.getItem('periodos');
    
    if (storedPeriodos) {
      const periodos = JSON.parse(storedPeriodos);
      const periodoUsuario = periodos.find(periodo => periodo.rol === rolUsuario);

      if (periodoUsuario) {
        const { inicio, fin } = periodoUsuario;
        const fechaInicio = dayjs(inicio);
        const fechaFin = dayjs(fin);
        const fechaActual = dayjs();

        if (fechaActual.isAfter(fechaInicio) && fechaActual.isBefore(fechaFin)) {
          setMensaje('Está habilitado para reservar ambientes.');
        } else if (fechaActual.isAfter(fechaFin)) {
          setMensaje('No existen reservas disponibles en este momento.');
        } else {
          setMensaje(`El periodo de reserva aún no ha comenzado: ${fechaInicio.format('DD/MM/YYYY')} - ${fechaFin.format('DD/MM/YYYY')}`);
        }
      } else {
        setMensaje('No existen reservas disponibles en este momento.');
      }
    } else {
      setMensaje('No se encontraron periodos de reserva en el almacenamiento local.');
    }
  };


  const handleReservarClick = () => {
    verificarPeriodoReserva();

    // Hacer que el mensaje desaparezca después de 3 segundos
    setTimeout(() => {
      setMensaje('');
    }, 10000);
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: "background.paper",
        boxShadow: 8,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" component="h2" sx={{ color: theme.palette.text.primary }}>
        MIS RESERVAS
      </Typography>
      <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} direction="column" justifyContent="center" alignItems="center">
        {/* Aquí puedes agregar el contenido relacionado con las reservas */}
      </Grid>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mt: 2 }}>
        {mensaje}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleReservarClick} sx={{ mt: 2 }}>
        Reservar ambiente
      </Button>
    </Box>
  );
};

export default MisReservas;
