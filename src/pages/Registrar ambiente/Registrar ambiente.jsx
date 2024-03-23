import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function RegistrarAmbiente() {
  const opcionesTipoEdificio = [
    { label: 'TRAER DESDE BAKCEN tipo de edificio' },
    { label: 'TRAER DESDE BACKEN' },
  ];

  const opcionesFacultad = [
    { label: 'TRAER DESDE BAKCEN facultades' },
    { label: 'TRAER DESDE BACKEN' },
  ];

  const opcionesNumeroPiso = [
    { label: 'TRAER DESDE BAKCEN el numero de piso' },
    { label: 'TRAER DESDE BACKEN' },
  ];

  const opcionesTipoAmbiente = [
    { label: 'Aula' },
    { label: 'Laboratorio' },
    { label: 'Auditorio' },
  ];

  const opcionesEstadoAmbiente = [
    { label: 'Disponible' },
    { label: 'No disponible' },
  ];

  return (
    <div>
      <Box
      //estilo
      sx={{
          p: 10, // padding
        bgcolor: 'background.paper',  
        boxShadow: 8,
        height: 'auto',

      }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 5 }}> REGISTRAR AMBIENTE </Typography>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 8, md: 3 }}>
          <Grid item xs={12} sm={6} >
            <TextField sx={{ mb: 2, width: 300 }} id="nombreAmbiente" label="Nombre de ambiente: " variant="standard" />
            <TextField
              id="standard-multiline-flexible"
              label="Descripción"
              multiline
              maxRows={4}
              sx={{ mb: 2, width: 300 }}
              variant="standard"
            />
            <TextField sx={{ mb: 2, width: 300 }} id="ubicacion" label="Ubicación: " variant="standard" />
          </Grid>


          <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={opcionesTipoAmbiente}
              sx={{ mb: 2, width: 300 }}
              renderInput={(params) => <TextField {...params} label="Tipo de ambiente:" />}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={opcionesEstadoAmbiente}
              sx={{ mb: 2, width: 300 }}
              renderInput={(params) => <TextField {...params} label="Estado de ambiente:" />}
            />
          </Grid>
        

          <Grid item xs={12} sm={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={opcionesTipoEdificio}
          sx={{ mb: 2, width: 300}}
          renderInput={(params) => <TextField {...params} label="Pertenece a:" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={opcionesFacultad}
          sx={{ mb: 2, width: 300 }}
          renderInput={(params) => <TextField {...params} label="Facultad:" />}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={opcionesNumeroPiso}
          sx={{ mb: 2, width: 300 }}
          renderInput={(params) => <TextField {...params} label="Piso:" />}
        />
        </Grid>

        </Grid>

        <Button variant="contained" sx={{ width: '30%' }}>REGISTRAR</Button>

      </Box>
    </div>
  );
}

export default RegistrarAmbiente;

