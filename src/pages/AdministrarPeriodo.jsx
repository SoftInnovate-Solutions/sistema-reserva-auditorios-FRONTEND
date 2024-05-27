import { Typography, useTheme, Grid, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Autocomplete, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit, PieChart } from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

// Configura dayjs para usar español
dayjs.locale('es');

const PeriodoReservaAdmin = () => {
  const theme = useTheme();
  const [periodos, setPeriodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [openRegistrar, setOpenRegistrar] = useState(false);
  const [editing, setEditing] = useState(null);
  const [fechaInicioGeneral, setFechaInicioGeneral] = useState("");
  const [fechaFinGeneral, setFechaFinGeneral] = useState("");

  const [fechaInicioDocente, setFechaInicioDocente] = useState("");
  const [fechaFinDocente, setFechaFinDocente] = useState("");

  const [fechaInicioAuxiliar, setFechaInicioAuxiliar] = useState("");
  const [fechaFinAuxiliar, setFechaFinAuxiliar] = useState("");

  const [fechaNotificaion, setFecahaNotificacion] = useState("");
  const [horaNotificacion, setHoraNotificacion] = useState("");

  const roles = [
    { title: 'Docente' },
    { title: 'Auxiliar' },
  ];
  const [selectedRole, setSelectedRole] = useState(null);


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
        console.log('Periodo registrado existosamentes');
      } else {
        const errorMessage = await response.text();
        console.error('Error al crear el periodo:', errorMessage);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }

    // if (editing !== null) {
    //   // Actualizar periodo existente
    //   const updatedPeriodos = periodos.map(p => (p.id === editing ? { id: editing, rol: selectedRole.title, inicio: fechaInicio, fin: fechaFin } : p));
    //   setPeriodos(updatedPeriodos);
    //   saveToLocalStorage(updatedPeriodos);
    // } else {

    // }

    // setEditing(null);
    // setFechaInicio(dayjs().format('YYYY-MM-DD'));
    // setFechaFin(dayjs().add(1, 'day').format('YYYY-MM-DD'));
  };

  // Declaración, añadir varibales necesarias y uso de funcionalidad 
  const [formData, setFormData] = useState("");

  const rellenarDatos = () => {
    const datos = {
      fecha_inicio_general_per: fechaInicioGeneral,
      fecha_fin_general_per: fechaFinGeneral,
      fecha_inicio_docente_per: fechaInicioDocente,
      fecha_fin_docente_per: fechaFinDocente,
      fecha_inicio_auxiliar_per: fechaInicioAuxiliar,
      fecha_fin_auxiliar_per: fechaFinAuxiliar,
      notificacion_per: fechaNotificaion + " " + horaNotificacion
    };
    setFormData(datos);
  };

  const handleEdit = (periodo) => {
    setEditing(periodo.id);
    const rolActual = roles.find(r => r.title === periodo.rol) || roles[1];
    setSelectedRole(rolActual)
    setFechaInicio(periodo.inicio);
    setFechaFin(periodo.fin);
    setOpen(true);
  };

  const handleRegistrar = () => {
    if (periodos.length < 2) {
      setOpenRegistrar(true);
      setEditing(null);
      setFechaInicioGeneral("");
      setFechaFinGeneral("");
      setFechaInicioDocente("");
      setFechaFinDocente("");
      setFechaInicioAuxiliar("");
      setFechaFinAuxiliar("");
      setFecahaNotificacion('');
      setHoraNotificacion("")
    }
  }

  const handleDelete = (id) => {
    const updatedPeriodos = periodos.filter(p => p.id !== id);
    setPeriodos(updatedPeriodos);
    saveToLocalStorage(updatedPeriodos);
  };

  return (
    <Box
      //estilo
      sx={{
        p: 4, // padding
        bgcolor: "background.paper",
        boxShadow: 8,
        textAlign: 'center',
        width: '80%',
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
          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(periodo.id)}>
            <Delete />
          </IconButton>
        </List>

        {/* <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>{editing !== null ? 'Editar Periodo de Reserva' : 'Agregar Periodo de Reserva'}</DialogTitle>
          <DialogContent>
            <h2 >Establecer periodo</h2>
            <Autocomplete
              value={selectedRole}
              onChange={handleRoleChange}
              options={roles}
              getOptionLabel={(option) => option.title}
              isOptionEqualToValue={(option, value) => option.title === value.title}
              renderInput={(params) => <TextField {...params} label="Selecciona un rol" variant="outlined" />}
              sx={{ marginTop: '22px', mb: 3 }}
            />
            <TextField
              label="Fecha de Inicio"
              type="date"
              fullWidth
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
            />
            <TextField
              label="Fecha de Fin"
              type="date"
              fullWidth
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">Cancelar</Button>
            <Button onClick={handleSave} color="primary">{editing !== null ? 'Guardar Cambios' : 'Agregar'}</Button>
          </DialogActions>
        </Dialog> */}

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
                  onChange={(e) => setFecahaNotificacion(e.target.value)}
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
