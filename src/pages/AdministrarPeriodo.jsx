import { Typography, useTheme, Grid, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Autocomplete, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit, PieChart } from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useNavigate } from 'react-router-dom';

// Configura dayjs para usar español
dayjs.locale('es');

const PeriodoReservaAdmin = () => {

  const navigate = useNavigate();
  const theme = useTheme();
  const [periodos, setPeriodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [openRegistrar, setOpenRegistrar] = useState(false);
  const [editing, setEditing] = useState(null);
  const [verEliminar, setVerEliminar] = useState(false);

  const [periodoReserva, setPeriodoReserva] = useState("");


  const [fechaInicioGeneral, setFechaInicioGeneral] = useState("");
  const [fechaFinGeneral, setFechaFinGeneral] = useState("");

  const [fechaInicioDocente, setFechaInicioDocente] = useState("");
  const [fechaFinDocente, setFechaFinDocente] = useState("");

  const [fechaInicioAuxiliar, setFechaInicioAuxiliar] = useState("");
  const [fechaFinAuxiliar, setFechaFinAuxiliar] = useState("");

  const [fechaNotificaion, setFechaNotificacion] = useState("");
  const [horaNotificacion, setHoraNotificacion] = useState("");


  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleRoleChange = (event, newValue) => {
    setSelectedRole(newValue);
  };

  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/edificacion/all')
  //     .then(response => response.json())
  //     .then(data => setTiposEdificacion(data))
  //     .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  // }, []);

  // Cargar periodos de reserva desde localStorage
  useEffect(() => {
    const storedPeriodos = localStorage.getItem('periodos');

    if (storedPeriodos) {
      // Parsear el string a un array u objeto
      const periodosArray = JSON.parse(storedPeriodos);

      if (Array.isArray(periodosArray)) {
        console.log(periodosArray);
      } else {
        console.log('La clave "periodos" no contiene un array.');
      }
    } else {
      console.log('No se encontraron datos en localStorage para la clave "periodos".');
    }

    if (storedPeriodos) {
      setVerEliminar(true);
      setPeriodos(JSON.parse(storedPeriodos));
    }
  }, []);

  // Guardar periodos de reserva en localStorage
  const saveToLocalStorage = (newPeriodos) => {
    localStorage.setItem('periodos', JSON.stringify(newPeriodos));
  };

  const handleSave = async () => {
    try {
      rellenarDatos();
      console.log(formData);
      const response = await fetch('http://127.0.0.1:5000/periodo_reserva/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Crear nuevo periodo
        const newPeriodo = {
          id: periodos.length + 1, generalInicio: fechaInicioGeneral, generalFin: fechaFinGeneral,
          docenteInicio: fechaInicioDocente, docenteFin: fechaFinDocente, auxiliarInicio: fechaInicioAuxiliar, auxiliarFin: fechaFinAuxiliar,
          NotificacionF: fechaNotificaion, NotificacionH: horaNotificacion
        };
        const newPeriodos = [...periodos, newPeriodo];
        setPeriodos(newPeriodos);
        saveToLocalStorage(newPeriodos);
        setOpenRegistrar(false);
        setOpen(false);
        setVerEliminar(true)
        console.log('Periodo registrado existosamentes');
      } else {
        const errorMessage = await response.text();
        console.log(formData);
        console.error('Error al crear el periodo:', errorMessage);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  // Declaración, añadir varibales necesarias y uso de funcionalidad 

  const rellenarDatos = () => {
    const datos = {
      fecha_inicio_general_per: fechaInicioGeneral, fecha_fin_general_per: fechaFinGeneral,
      fecha_inicio_docente_per: fechaInicioDocente, fecha_fin_docente_per: fechaFinDocente,
      fecha_inicio_auxiliar_per: fechaInicioAuxiliar, fecha_fin_auxiliar_per: fechaFinAuxiliar,
      notificacion_per: fechaNotificaion + " " + horaNotificacion
    };
    setFormData(datos);
  };

  useEffect(() => {
    rellenarDatos();
  }, [fechaInicioGeneral, fechaInicioGeneral, fechaInicioDocente, fechaFinDocente, fechaInicioAuxiliar,
    fechaFinAuxiliar, fechaNotificaion, horaNotificacion, setFormData]);

  const handleRegistrar = () => {
    if (periodos.length < 1) {
      setOpenRegistrar(true); setEditing(null);
      // setFechaInicioGeneral(""); setFechaFinGeneral("");
      // setFechaInicioDocente(""); setFechaFinDocente("");
      // setFechaInicioAuxiliar(""); setFechaFinAuxiliar("");
      // setFechaNotificacion(''); setHoraNotificacion("")
      setFechaInicioGeneral("2024-07-01");
      setFechaFinGeneral("2024-07-15");

      setFechaInicioDocente("2024-06-01");
      setFechaFinDocente("2024-06-30");

      setFechaInicioAuxiliar("2024-06-15");
      setFechaFinAuxiliar("2024-06-30");

      setFechaNotificacion("2024-05-31");
      setHoraNotificacion("08:00");

    }
  }

  const handleDelete = () => {

    fetch('http://127.0.0.1:5000/periodo_reserva/periodo_general')
      .then(response => response.json())
      .then(data => {
        setPeriodoReserva(data)
        if (typeof data.cod_periodo_reserva === 'string') {
          console.log('La variable es una cadena');
        } else if (typeof data.cod_periodo_reserva === 'number') {
          console.log('La variable es un número');
        } else {
          console.log('La variable no es ni cadena ni número');
        }

        fetch(`http://127.0.0.1:5000/periodo_reserva/delete/${data.cod_periodo_reserva}`, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(data => {
            console.log('Periodo de reserva eliminado correctamente:', data);
            localStorage.removeItem('periodos');
            reloadCurrentRoute()
          })
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  };

  const reloadCurrentRoute = () => {
    navigate('/');
    setTimeout(() => {
      navigate('/administrar-periodo');
    }, 1);
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
        width: '500px',
        margin: '0 auto', // centrado horizontal
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" component="h2" sx={{ color: theme.palette.text.primary }}>PERIODO DE RESERVA</Typography>
      <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} direction="column" justifyContent="center" alignItems="center">

        <List >
          {periodos.map((periodo) => (
            <ListItem key={periodo.id} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <ListItemText sx={{ mb: 1 }} primary="Periodo general:" />
              <ListItemText sx={{ mb: 2 }} primary={`Inicio: ${periodo.generalInicio}  -  Fin: ${periodo.generalFin}`} />

              <ListItemText sx={{ mb: 1 }} primary="Periodo Docente:" />
              <ListItemText sx={{ mb: 2 }} primary={`Inicio: ${periodo.docenteInicio}  -  Fin: ${periodo.docenteFin}`} />

              <ListItemText sx={{ mb: 1 }} primary="Periodo Auxiliar:" />
              <ListItemText sx={{ mb: 2 }} primary={`Inicio: ${periodo.auxiliarInicio}  -  Fin: ${periodo.auxiliarFin}`} />

              <ListItemText sx={{ mb: 1 }} primary="Notificación:" />
              <ListItemText sx={{ mb: 2 }} primary={`Fecha: ${periodo.NotificacionF}  -  Hora: ${periodo.NotificacionH}`} />


              {/* <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(periodo)}>
                  <Edit />
                </IconButton> */}


            </ListItem>
          ))}
          {verEliminar && (
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete()}>
              <Delete />
            </IconButton>
          )}

        </List>

        <Dialog open={openRegistrar} onClose={() => setOpenRegistrar(false)}>
          <DialogTitle>{'Agregar Periodo de Reserva'}</DialogTitle>
          <DialogContent>

            <h2 >Establecer periodo general: </h2>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Fecha de Inicio"
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
                  label="Fecha de Fin"
                  type="date"
                  fullWidth
                  value={fechaFinGeneral}
                  onChange={(e) => setFechaFinGeneral(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 3, marginTop: '22px' }}
                />
              </Grid>
            </Grid>

            <h2 >Establecer periodo de docente: </h2>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Fecha de Inicio"
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
                  label="Fecha de Fin"
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
                  label="Fecha de Inicio"
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
                  label="Fecha de Fin"
                  type="date"
                  fullWidth
                  value={fechaFinAuxiliar}
                  onChange={(e) => setFechaFinAuxiliar(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 3, marginTop: '22px' }}
                />
              </Grid>
            </Grid>

            <h2 >Notificación de periodo</h2>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Fecha"
                  type="date"
                  fullWidth
                  value={fechaNotificaion}
                  onChange={(e) => setFechaNotificacion(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 3, marginTop: '22px' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Hora"
                  type="time"
                  fullWidth
                  value={horaNotificacion}
                  onChange={(e) => setHoraNotificacion(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 3, marginTop: '22px' }}
                />
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenRegistrar(false)} color="primary">Cancelar</Button>
            <Button onClick={handleSave} color="primary">{editing !== null ? 'Guardar Cambios' : 'Agregar'}</Button>
          </DialogActions>
        </Dialog>

      </Grid>
      <Button variant="contained" color="primary" onClick={handleRegistrar}>Agregar Periodo de Reserva</Button>

    </Box>
  );
};

export default PeriodoReservaAdmin;
