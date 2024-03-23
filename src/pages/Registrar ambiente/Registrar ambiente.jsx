import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function RegistrarAmbiente() {
  const opcionesTipoEdificio = [
    { label: "TRAER DESDE BAKCEN tipo de edificio" },
    { label: "TRAER DESDE BACKEN" },
  ];

  const opcionesFacultad = [
    { label: "TRAER DESDE BAKCEN facultades" },
    { label: "TRAER DESDE BACKEN" },
  ];

  const opcionesNumeroPiso = [
    { label: "TRAER DESDE BAKCEN el numero de piso" },
    { label: "TRAER DESDE BACKEN" },
  ];

  const opcionesTipoAmbiente = [
    { label: "Aula" },
    { label: "Laboratorio" },
    { label: "Auditorio" },
  ];

  const opcionesEstadoAmbiente = [
    { label: "Disponible" },
    { label: "No disponible" },
  ];

  return (
    <div>
      <Box
        //estilo
        sx={{
          p: 10, // padding
          bgcolor: "background.paper",
          boxShadow: 8,
          height: "auto",
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 5 }}>
          {" "}
          REGISTRAR AMBIENTE{" "}
        </Typography>

        <TextField
          sx={{ mb: 2, width: 300 }}
          id="nombreAmbiente"
          label="Nombre de ambiente: "
          variant="standard"
        />
        <TextField
          id="standard-multiline-flexible"
          label="Descripción"
          multiline
          maxRows={4}
          sx={{ mb: 2, width: 300 }}
          variant="standard"
        />
        <TextField
          sx={{ mb: 2, width: 300 }}
          id="ubicacion"
          label="Ubicación: "
          variant="standard"
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={opcionesTipoAmbiente}
          sx={{ mb: 2, width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Tipo de ambiente:" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={opcionesEstadoAmbiente}
          sx={{ mb: 2, width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Estado de ambiente:" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={opcionesTipoEdificio}
          sx={{ mb: 2, width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Pertenece a:" />
          )}
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
        <Button variant="contained" sx={{ width: "30%" }}>
          REGISTRAR
        </Button>
      </Box>
    </div>
  );
}

export default RegistrarAmbiente;
