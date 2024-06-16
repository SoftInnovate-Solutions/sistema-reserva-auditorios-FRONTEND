import React, { useState, useEffect } from 'react';
import { Box, TextField, useTheme, Typography, Button, Grid } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendario.css';
import MisReservas from './MisReservas';
import { NavLink, useNavigate } from 'react-router-dom';

import Politica2 from '../components/politica2'
import Politica1 from '../components/politica1'

moment.updateLocale('es', {
  months: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthsShort: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  weekdays: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  weekdaysShort: [
    'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
  ],
  weekdaysMin: [
    'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'
  ]
});
moment.locale('es');
const localizer = momentLocalizer(moment);

const Calendario = () => {
  ///////////////
  const navigate = useNavigate();
  const theme = useTheme();

  const [verOpcionesPolitica1, setOpcionesVerPolitica1] = useState(false);
  const [verOpcionesPolitica2, setOpcionesVerPolitica2] = useState(false);

  // --------------------------------------------------------------------------------
  const mostrarPolitica2 = () => {
    setOpcionesVerPolitica2(true);
    setOpcionesVerPolitica1(false);

  }

  const mostrarPolitica1 = () => {
    setOpcionesVerPolitica1(true);
    setOpcionesVerPolitica2(false);

  }

  return (
    <Box
      //estilo
      sx={{
        p: 4, // padding
        bgcolor: "background.paper",
        boxShadow: 8,
        textAlign: 'center',
        width: '100%',
        margin: '0 auto', // centrado horizontal
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      <div>
        <Typography variant="h5" component="h2" sx={{ mb: 2, color: theme.palette.text.primary, textAlign: 'center' }}>CALENDARIO</Typography>
        <div className="flex justify-start items-start mb-4">
          <Link to="/mis-reservas" className="bg-primary text-white px-10 py-2 rounded-md">
            Mis Reservas
          </Link>
        </div>

        <Grid container spacing={2}>

          <Grid item md={6} lg={6} xl={6}>
            <Button onClick={mostrarPolitica1} color="primary" variant="contained" sx={{ mb: 3 }}>Buscar por Ambiente</Button>
          </Grid>

          <Grid item md={6} lg={6} xl={6}>
            <Button onClick={mostrarPolitica2} color="primary" variant="contained" sx={{ mb: 3 }}>Buscar por Fecha y Capacidad</Button>
          </Grid>

        </Grid>

        {verOpcionesPolitica2 && (
          <Politica2 />
        )}

        {verOpcionesPolitica1 && (
          <Politica1 />
        )}

      </div>
    </Box>
  );
};

export default Calendario;