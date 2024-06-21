import { Typography, useTheme, Grid, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import ModalElimReservas from '../components/modalElimReservas';
import ModalElimExamenes from '../components/modalElimExamenes';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useNavigate } from 'react-router-dom';

// Configura dayjs para usar español
dayjs.locale('es');

const PeriodoReservaAdmin = () => {

  const navigate = useNavigate();
  const theme = useTheme();
  const [periodos, setPeriodos] = useState({});
  const [periodosExa, setPeriodosExa] = useState({});
  const [editing, setEditing] = useState(null);

  // inicializacion de botones de estados para mostrar o ocultar
  const [openReserva, setOpenReserva] = useState(false);
  const [verEliminar, setVerEliminar] = useState(false);
  const [botonEstado, setBotonEstado] = useState(true);

  const [openExamenes, setOpenExamenes] = useState(false);
  const [verEliminarExa, setVerEliminarExa] = useState(false);
  const [botonEstadoExa, setBotonEstadoExa] = useState(true);

  // Variables del formulario
  const [fechaInicioGeneral, setFechaInicioGeneral] = useState("");
  const [fechaFinGeneral, setFechaFinGeneral] = useState("");

  const [fechaInicioDocente, setFechaInicioDocente] = useState("");
  const [fechaFinDocente, setFechaFinDocente] = useState("");

  const [fechaInicioAuxiliar, setFechaInicioAuxiliar] = useState("");
  const [fechaFinAuxiliar, setFechaFinAuxiliar] = useState("");

  const [fechaNotificaion, setFechaNotificacion] = useState("");
  const [horaNotificacion, setHoraNotificacion] = useState("");

  const [formData, setFormData] = useState(null);

  //variables modal eliminar periodo de reservas
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  const handleOpenModalEliminar = () => {
    setOpenModalEliminar(true);
  };

  const handleCloseModalEliminar = () => {
    setOpenModalEliminar(false);
  };

  //variables modal eliminar periodo de examenes
  const [openModalElimExa, setOpenModalElimExa] = useState(false);

  const handleOpenModalElimExa = () => {
    setOpenModalElimExa(true);
  };

  const handleCloseModalElimExa = () => {
    setOpenModalElimExa(false);
  };

  // - - - - - - - - - - I N I C I A L I Z A C I O N E S - - - - - - - - - - - - - -
  const handleRegistrar = () => {
    setOpenReserva(true); setEditing(null);

    // setFechaInicioGeneral(""); setFechaFinGeneral("");
    // setFechaNotificacion(''); setHoraNotificacion("");

    // setFechaInicioDocente(""); setFechaFinDocente("");
    // setFechaInicioAuxiliar(""); setFechaFinAuxiliar("");

    if (Object.keys(periodosExa).length === 0) {
      setFechaInicioGeneral("2000-01-01"); setFechaFinGeneral("2000-01-01");
    }

    setFechaInicioDocente("2024-06-01");
    setFechaFinDocente("2024-06-30");

    setFechaInicioAuxiliar("2024-06-15");
    setFechaFinAuxiliar("2024-06-30");

    setFechaNotificacion("2024-05-31");
    setHoraNotificacion("08:00");
  }

  const handleRegistrarExa = () => {
    setOpenExamenes(true); setEditing(null);

    // setFechaInicioDocente(""); setFechaFinDocente("");
    // setFechaInicioAuxiliar(""); setFechaFinAuxiliar("");
    // setFechaNotificacion(''); setHoraNotificacion("");
    // setFechaInicioGeneral(""); setFechaFinGeneral("");
    if (Object.keys(periodos).length === 0) {
      setFechaInicioDocente("2000-01-01"); setFechaFinDocente("2000-01-01");
      setFechaInicioAuxiliar("2000-01-01"); setFechaFinAuxiliar("2000-01-01");
    }

    setFechaInicioGeneral("2024-07-01");
    setFechaFinGeneral("2024-07-15");

    setFechaNotificacion("2024-05-31");
    setHoraNotificacion("08:00");
  }

  // Cargar datos de la BASE DE DATOS
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/periodo_reserva/periodo_general`)
      .then(response => response.json())
      .then(data => {

        if (Object.keys(data).length > 0) {
          if (data.fecha_inicio_docente_per != "2000-01-01") {
            setFechaInicioDocente(data.fecha_inicio_docente_per);
            setFechaFinDocente(data.fecha_fin_docente_per);
            setFechaInicioAuxiliar(data.fecha_inicio_auxiliar_per);
            setFechaFinAuxiliar(data.fecha_fin_auxiliar_per);

            setVerEliminar(true);
            setBotonEstado(false);
            setPeriodos(data);
            console.log(data);
          }

          if (data.fecha_inicio_general_per != "2000-01-01") {
            setFechaInicioGeneral(data.fecha_inicio_general_per);
            setFechaFinGeneral(data.fecha_fin_general_per);

            setVerEliminarExa(true);
            setBotonEstadoExa(false);
            setPeriodosExa(data);
          }
        }
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, []);

  const actualizarAmbosPeriodos = () => {
    const storedPeriodos = localStorage.getItem('periodos');
    const storedPeriodosExa = localStorage.getItem('periodosExa');

    if (storedPeriodos) {
      setVerEliminar(true);
      setBotonEstado(false);
      setPeriodos(JSON.parse(storedPeriodos));
    }

    if (storedPeriodosExa) {
      setVerEliminarExa(true);
      setBotonEstadoExa(false);
      setPeriodosExa(JSON.parse(storedPeriodosExa));
    }
  }

  // - - - - - - - - - - - - - - - G U A R D A D O - - - - - - - - - - - -
  const handleSave = async () => {
    try {
      rellenarDatos();
      const response = await fetch('http://127.0.0.1:5000/periodo_reserva/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setOpenReserva(false);
        setVerEliminar(true);
        setBotonEstado(false);
        console.log('Periodo de reservas creado existosamentes');
        if (Object.keys(periodosExa).length > 0) {
          handleDeleteAnterior();
        }
        reloadCurrentRoute();
      } else {
        const errorMessage = await response.text();
        console.log(formData);
        console.error('Error al crear el periodo:', errorMessage);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };


  const handleSaveExa = async () => {
    try {
      rellenarDatos();
      const response = await fetch('http://127.0.0.1:5000/periodo_reserva/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {

        setOpenExamenes(false);
        setVerEliminarExa(true);
        setBotonEstadoExa(false);
        console.log('Periodo registrado existosamentes');

        if (Object.keys(periodos).length > 0) {
          handleDeleteAnterior();
        }
        reloadCurrentRoute();
      } else {
        const errorMessage = await response.text();
        console.log(formData);
        console.error('Error al crear el periodo:', errorMessage);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  // - - - - - - - E L I M I N A C I Ó N - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
  const handleDeleteAnterior = () => {
    fetch('http://127.0.0.1:5000/periodo_reserva/periodo_general')
      .then(response => response.json())
      .then(data => {
        fetch(`http://127.0.0.1:5000/periodo_reserva/delete/${data.cod_periodo_reserva - 1}`, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(data => {
            console.log('Periodo de reserva eliminado correctamente:', data);
            localStorage.removeItem('periodosExa');
            setBotonEstado(true);
            reloadCurrentRoute();
          })
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  };


  const handleDelete = () => {
    fetch('http://127.0.0.1:5000/periodo_reserva/periodo_general')
      .then(response => response.json())
      .then(data => {
        fetch(`http://127.0.0.1:5000/periodo_reserva/delete/${data.cod_periodo_reserva}`, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(data => {
            console.log('Periodo de reserva eliminado correctamente:', data);
            localStorage.removeItem('periodosExa');
            setBotonEstado(true);
            reloadCurrentRoute();
          })
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));

    if (Object.keys(periodosExa).length > 0) {
      fetch('http://127.0.0.1:5000/periodo_reserva/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fecha_inicio_general_per: fechaInicioGeneral, fecha_fin_general_per: fechaFinGeneral,
          fecha_inicio_docente_per: "2000-01-01", fecha_fin_docente_per: "2000-01-01",
          fecha_inicio_auxiliar_per: "2000-01-01", fecha_fin_auxiliar_per: "2000-01-01",
          notificacion_per: "2024-05-12 08:30:00"
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('LO LOGRO', data);
          reloadCurrentRoute();
          // reloadCurrentRoute();
        })
    }
  };

  const handleDeleteExa = () => {
    fetch('http://127.0.0.1:5000/periodo_reserva/periodo_general')
      .then(response => response.json())
      .then(data => {
        fetch(`http://127.0.0.1:5000/periodo_reserva/delete/${data.cod_periodo_reserva}`, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(data => {
            console.log('Periodo de reserva eliminado correctamente:', data);
            setBotonEstadoExa(true);
            reloadCurrentRoute();
          })
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));

    if (Object.keys(periodos).length > 0) {
      fetch('http://127.0.0.1:5000/periodo_reserva/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fecha_inicio_general_per: "2000-01-01", fecha_fin_general_per: "2000-01-01",
          fecha_inicio_docente_per: fechaInicioDocente, fecha_fin_docente_per: fechaFinDocente,
          fecha_inicio_auxiliar_per: fechaInicioAuxiliar, fecha_fin_auxiliar_per: fechaFinAuxiliar,
          notificacion_per: "2024-05-12 08:30:00"
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log('LO LOGRO', data);
          reloadCurrentRoute();
          // reloadCurrentRoute();
        })
    }
  };

  const handleUpss = () => {

    fetch('http://127.0.0.1:5000/periodo_reserva/periodo_general')
      .then(response => response.json())
      .then(data => {
        fetch(`http://127.0.0.1:5000/periodo_reserva/delete/${data.cod_periodo_reserva}`, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(data => {
            console.log('Periodo de reserva eliminado correctamente:', data);
            reloadCurrentRoute();
          })
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  };

  // - - - - - - - - - - - - - - O T R A S  F U N C I O N E S - - - - - - - - - - - - - - - -
  // Declaración, añadir varibales necesarias y uso de funcionalidad 
  const rellenarDatos = () => {
    const datos = {
      fecha_inicio_general_per: fechaInicioGeneral, fecha_fin_general_per: fechaFinGeneral,
      fecha_inicio_docente_per: fechaInicioDocente, fecha_fin_docente_per: fechaFinDocente,
      fecha_inicio_auxiliar_per: fechaInicioAuxiliar, fecha_fin_auxiliar_per: fechaFinAuxiliar,
      notificacion_per: "2024-05-12 08:30:00"
    };
    setFormData(datos);
  };

  const rellenarDatos2 = () => {
    var iniGeneral; var finGeneral;
    if (fechaInicioGeneral === "") {
      iniGeneral = "2000-01-01";
      finGeneral = "2000-01-01"
    } else {
      iniGeneral = fechaInicioGeneral;
      finGeneral = fechaFinGeneral
    }
    const datos = {
      fecha_inicio_general_per: iniGeneral, fecha_fin_general_per: finGeneral,
      fecha_inicio_docente_per: fechaInicioDocente, fecha_fin_docente_per: fechaFinDocente,
      fecha_inicio_auxiliar_per: fechaInicioAuxiliar, fecha_fin_auxiliar_per: fechaFinAuxiliar,
      notificacion_per: "2024-05-12 08:30:00"
    };
    setFormData(datos);
  };

  const reloadCurrentRoute = () => {
    navigate('/');
    setTimeout(() => {
      navigate('/administrar-periodo');
    }, 1);
  };

  useEffect(() => {
    rellenarDatos();
  }, [fechaInicioGeneral, fechaFinGeneral, fechaInicioDocente, fechaFinDocente, fechaInicioAuxiliar,
    fechaFinAuxiliar, fechaNotificaion, horaNotificacion, setFormData]);

  useEffect(() => {
    rellenarDatos2();
  }, [fechaInicioGeneral, fechaFinGeneral, fechaInicioDocente, fechaFinDocente, fechaInicioAuxiliar,
    fechaFinAuxiliar, fechaNotificaion, horaNotificacion, setFormData]);

  const invertirFechas = (periodo) => {
    if (periodo !== undefined) {
      const [year, month, day] = periodo.split("-");
      const fechaReformateado = `${day}/${month}/${year}`;

      return `${fechaReformateado}`;
    } else {
      return "No disponible";
    }
  };

  return (
    <Box
      //estilo
      sx={{
        p: 4, // padding
        bgcolor: "background.paper",
        boxShadow: 8,
        textAlign: 'center',
        // width: '50%',
        width: '800px',
        margin: '0 auto', // centrado horizontal
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" component="h2" sx={{ color: theme.palette.text.primary }}>ADMINISTRACIÓN DE PERIODOS DE RESERVA Y EXAMENES</Typography>

      <Grid container spacing={2}>
        <Grid item md={6} lg={6} xl={6}>
          <Typography variant="h6" component="h2" sx={{ color: theme.palette.text.primary, marginTop: "10px" }}>Periodo de reservas</Typography>

          <List >
            {Object.keys(periodos).length > 0 && (
              <ListItem key={periodos.id} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <ListItemText sx={{ mb: 1, marginLeft: '50px' }} primary="Docente:" />
                <ListItemText sx={{ mb: 2, marginLeft: '100px' }} primary={`${invertirFechas(periodos.fecha_inicio_docente_per)}  -  ${invertirFechas(periodos.fecha_fin_docente_per)}`} />

                <ListItemText sx={{ mb: 1, marginLeft: '50px' }} primary="Auxiliar:" />
                <ListItemText sx={{ mb: 2, marginLeft: '100px' }} primary={`${invertirFechas(periodos.fecha_inicio_auxiliar_per)}  - ${invertirFechas(periodos.fecha_fin_auxiliar_per)}`} />
              </ListItem>
            )}
            {verEliminar && (
              <IconButton edge="end" aria-label="delete" onClick={() => handleOpenModalEliminar()}>
                <Delete />
              </IconButton>
            )}
            <ModalElimReservas
              open={openModalEliminar}
              handleClose={handleCloseModalEliminar}
              handleDelete={handleDelete}
            />
          </List>

          <Dialog open={openReserva} onClose={() => setOpenReserva(false)}>
            <DialogTitle>{'Agregar Periodo de Reserva'}</DialogTitle>
            <DialogContent>

              <h2 >Establecer periodo de docente: </h2>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Desde"
                    type="date"
                    fullWidth
                    value={fechaInicioDocente}
                    onChange={(e) => setFechaInicioDocente(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, marginTop: '22px' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Hasta"
                    type="date"
                    fullWidth
                    value={fechaFinDocente}
                    onChange={(e) => setFechaFinDocente(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, marginTop: '22px' }}
                  />
                </Grid>
              </Grid>

              <h2 >Establecer periodo de auxiliar: </h2>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Desde"
                    type="date"
                    fullWidth
                    value={fechaInicioAuxiliar}
                    onChange={(e) => setFechaInicioAuxiliar(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, marginTop: '22px' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Hasta"
                    type="date"
                    fullWidth
                    value={fechaFinAuxiliar}
                    onChange={(e) => setFechaFinAuxiliar(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, marginTop: '22px' }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenReserva(false)} color="primary">Cancelar</Button>
              <Button onClick={(handleSave)} color="primary">{editing !== null ? 'Guardar Cambios' : 'Agregar'}</Button>
            </DialogActions>
          </Dialog>

          {botonEstado && (<Button variant="contained" color="primary" onClick={handleRegistrar}>Agregar</Button>)}

        </Grid>

        <Grid item md={6} lg={6} xl={6} >
          <Typography variant="h6" component="h2" sx={{ color: theme.palette.text.primary, marginTop: "10px" }}>Periodo de examenes</Typography>

          <List >
            {Object.keys(periodosExa).length > 0 && (

              <ListItem key={periodosExa.id} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <ListItemText sx={{ mb: 2, marginLeft: '75px' }} primary={` ${invertirFechas(periodosExa.fecha_inicio_general_per)}  -  ${invertirFechas(periodosExa.fecha_fin_general_per)}`} />
              </ListItem>

            )}
            {verEliminarExa && (
              <IconButton edge="end" aria-label="delete" onClick={() => handleOpenModalElimExa()}>
                <Delete />
              </IconButton>
            )}

            <ModalElimExamenes
              open={openModalElimExa}
              handleClose={handleCloseModalElimExa}
              handleDelete={handleDeleteExa}
            />
          </List>

          <Dialog open={openExamenes} onClose={() => setOpenExamenes(false)}>
            <DialogTitle>{'Agregar Periodo de Reserva'}</DialogTitle>
            <DialogContent>

              <h2 >Establecer periodo de examenes: </h2>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Desde"
                    type="date"
                    fullWidth
                    value={fechaInicioGeneral}
                    onChange={(e) => setFechaInicioGeneral(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, marginTop: '22px' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Hasta"
                    type="date"
                    fullWidth
                    value={fechaFinGeneral}
                    onChange={(e) => setFechaFinGeneral(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, marginTop: '22px' }}
                  />
                </Grid>
              </Grid>

            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenExamenes(false)} color="primary">Cancelar</Button>
              <Button onClick={(handleSaveExa)} color="primary">{editing !== null ? 'Guardar Cambios' : 'Agregar'}</Button>
            </DialogActions>
          </Dialog>

          {botonEstadoExa && (<>
            <Button variant="contained" color="primary" onClick={handleRegistrarExa}>Agregar</Button>
            <IconButton edge="end" aria-label="delete" sx={{ opacity: 0 }} onClick={() => handleUpss()}>
              <Delete />
            </IconButton>
          </>)}

        </Grid>

      </Grid>
    </Box>
  );
};

export default PeriodoReservaAdmin;
