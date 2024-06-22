import React, { useState, useEffect, forwardRef } from 'react';
import Box from "@mui/material/Box";
import { Typography, useTheme, Grid, Button, TextField, Modal, Alert, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './DisponibilidadAmbiente.css';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
// Estilo para el modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  textAlign: 'center',
};

let porcentajeMin = 0.5;
let porcentajeMax = 1.10;

function DisponibilidadAmbiente() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => { setOpen(false); navigate('/administrar-ambiente'); }
  const navegarAdministrarAmb = () => { navigate('/administrar-ambiente'); }

  const { id } = useParams();
  const theme = useTheme();
  const diasSemana = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
  const horario = ["06:45 - 08:15 ", "08:15 - 09:45 ", "09:45 - 11:15 ", "11:15 - 12:45", "12:45 - 14:15", "14:15 - 15:45",
    "15:45 - 17:15", "17:15 - 18:45", "18:45 - 20:15", "20:15 - 21:45"];
  const bloqueInicial = Array.from({ length: 10 }, () => Array(7).fill(1));
  const [bloquesAmbientes, setBloquesAmbientes] = useState(bloqueInicial);
  // const [hayPeriodo, setHayPeriodo] = useState(false);
  const [mostrarBloques, setMostrarBloques] = useState(false);


  const [capacidadMin, setCapacidadMin] = useState('');
  const [errorCapacidadMin, setErrorCapacidadMin] = useState(false);
  const [mensajeErrorCapacidadMin, setMensajeErrorCapacidadMin] = useState('');

  const [capacidadActual, setCapacidadActual] = useState('');

  const [capacidadMax, setCapacidadMax] = useState('');
  const [errorCapacidadMax, setErrorCapacidadMax] = useState(false);
  const [mensajeErrorCapacidadMax, setMensajeErrorCapacidadMax] = useState('');

  const [general_inicio, setGeneral_inicio] = useState('');
  const [general_final, setGeneral_final] = useState('');

  // Declaración, añadir varibales necesarias y uso de funcionalidad 
  const [formData, setFormData] = useState("");
  const [formDataCapacidad, setFormDataCapacidad] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/ambiente/one_setting/${id}`)
      .then(response => response.json())
      .then(data => {
        setCapacidadMax(data.albergacion_max_amb);
        setCapacidadMin(data.albergacion_min_amb);
        setCapacidadActual(data.capacidad_amb);
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, [id]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/ajuste_ambiente/get_ajuste_ambiente/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.configuracion.length > 0) {
          setMostrarBloques(true)
        }
        setBloquesAmbientes(data.configuracion);
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, [id]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/periodo_reserva/periodo_general`)
      .then(response => response.json())
      .then(data => {
        // setHayPeriodo(true);
        setGeneral_final(data.fecha_fin_general_per);
        setGeneral_inicio(data.fecha_inicio_general_per);
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, [id]);

  //Validaciones y control de inputs
  const manejadorCambiosCapacidadMin = (event) => {
    const inputNumero = event.target.value;
    if (/^\d*$/.test(inputNumero)) {
      // console.log(capacidadActual * porcentajeMin);
      // if (inputNumero === '' || (parseInt(inputNumero) >= capacidadActual * porcentajeMin && parseInt(inputNumero) <= capacidadActual)) {
      if (inputNumero === '' || (parseInt(inputNumero) >= 0 && parseInt(inputNumero) <= capacidadActual)) {
        setCapacidadMin(inputNumero);
      }
      setErrorCapacidadMin(false);
      setMensajeErrorCapacidadMin('');
    } else {
      setErrorCapacidadMin(true);
      setMensajeErrorCapacidadMin('Ingrese solo números');
    }

  };

  const manejadorCambiosCapacidadMax = (event) => {
    const inputNumero = event.target.value;
    if (/^\d*$/.test(inputNumero)) {
      if (inputNumero === '' || (parseInt(inputNumero) >= 0 && parseInt(inputNumero) <= 1000)) {
        setCapacidadMax(inputNumero);
      }
      setErrorCapacidadMax(false);
      setMensajeErrorCapacidadMax('');
    } else {
      setErrorCapacidadMax(true);
      setMensajeErrorCapacidadMax('Ingrese solo números');
    }
  };

  const validarCapacidadMin = () => {
    if (!capacidadMin) {
      setMensajeErrorCapacidadMin('la capacidad es requerido.');
      setErrorCapacidadMin(true);
      return true;
    }

    if (capacidadMin.length > 4) {
      setMensajeErrorCapacidadMin('La capacidad no debe exceder los 4 cifras');
      setErrorCapacidadMin(true);
      return true;
    }
    setMensajeErrorCapacidadMin('');
    setErrorCapacidadMin(false);
    return false;
  }

  const validarCapacidadMax = () => {
    if (!capacidadMax) {
      setMensajeErrorCapacidadMax('La capacidad es requerido.');
      setErrorCapacidadMax(true);
      return true;
    }

    if (parseInt(capacidadMax) < parseInt(capacidadActual)){
      setMensajeErrorCapacidadMax('La capacidad maxima no debe ser menor a la capacidad actual');
      setErrorCapacidadMax(true);
      return true;
    }

      setMensajeErrorCapacidadMax('');
    setErrorCapacidadMax(false);
    return false;
  }

  const validarTodosLosInputs = () => {
    validarCapacidadMin(); validarCapacidadMax
    return !validarCapacidadMin() && !validarCapacidadMax();
  }

  const createBloques = () => {
    setBloquesAmbientes(bloqueInicial);
    setMostrarBloques(true);
  }

  // Manejar el clic en una celda
  const handleCellClick = (rowIndex, colIndex) => {
    const newGrid = bloquesAmbientes.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) {
          return cell === 0 ? 1 : 0; // Cambiar entre 0 y 1
        }
        return cell;
      })
    );
    setBloquesAmbientes(newGrid);
  };

  //ENVIO FORMULARIO
  const manejarEnvio = async () => {
    if(validarTodosLosInputs()){
      try {
        await enviarPeriodo();
        // console.log("++++++ => Formulario enviado");
        if (!open) {
          handleOpen();
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    }else{
      setMostrarAlerta(true);
    }

  };

  const enviarPeriodo = async () => {

    try {
      rellenarDatos();
      const response = await fetch(`http://127.0.0.1:5000/ajuste_ambiente/addUpdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const response2 = await fetch(`http://127.0.0.1:5000/ambiente/update_setting/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(formDataCapacidad),
      });

      if (response.ok && response2.ok) {
        handleOpen();
        //console.log('ambiente ajustado correctamente');
      } else {
        const errorMessage = await response.text();
        console.error('Error al actualizar el periodo:', errorMessage);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const rellenarDatos = () => {
    const idd = parseInt(id)
    const datosAutocompletados = {
      cod_ambiente: idd,  
      configuracion: bloquesAmbientes,
      fecha_inicio_general_per: general_inicio,
      fecha_fin_general_per: general_final
    };

    const datosCapacidad = {
      albergacion_max_amb: capacidadMax,
      albergacion_min_amb: capacidadMin
    }

    setFormDataCapacidad(datosCapacidad);
    setFormData(datosAutocompletados);
  };

  useEffect(() => {
    rellenarDatos();
  }, [id, bloquesAmbientes, general_inicio, general_final, capacidadMin, capacidadMax, setFormData, setFormDataCapacidad]);

  //#region ----------------- IMPLEMENTACIÓN DEL ALERT Y MODAL ------------------------------------------------------------------------------------------------------ 
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const ChildModal = forwardRef(({ handleClose }, ref) => {
    return (
      <Box ref={ref} sx={style} tabIndex={0}>
        <span style={{ fontSize: '48px', color: '#4caf50', display: 'block', marginBottom: '20px' }}>&#10003;</span>
        <h2 id="child-modal-title">Configuración de disponibilidad guardada correctamente</h2>
        <Button onClick={handleClose}>OK</Button>
      </Box>
    );
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMostrarAlerta(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [mostrarAlerta]);

  //#endregion

  return (
    <Box
      //estilo
      sx={{
        p: 4, // padding
        bgcolor: "background.paper",
        boxShadow: 8,
        textAlign: 'center',
        // width: '80%',
        width: '650px',
        margin: '0 auto', // centrado horizontal
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      <Grid container alignItems="center" sx={{ mb: 3 }}>
        <Grid item >
          <IconButton onClick={navegarAdministrarAmb} aria-label="back">
            <ArrowBackIcon fontSize='large' />
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
          <Typography variant="h5" component="h2" sx={{ color: theme.palette.text.primary }}>DISPONIBILIDAD DE AMBIENTE</Typography>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <h2>Configuración de disponibilidad:</h2>
      </Box>

      <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} direction="column" justifyContent="center" alignItems="center">
        <Grid sx={{ mt: 2 }}>
          <h2>Fecha inicio: {general_inicio} -  Fecha final: {general_final}</h2>
        </Grid>
      </Grid>

      {!mostrarBloques &&
        <Button type="submit" variant="contained" onClick={createBloques} sx={{ marginTop: '18px', width: '50%' }} className='formboton'>
          CREAR BLOQUES DE DIAS PARA ESTE AMBIENTE
        </Button>
      }

      {mostrarBloques && (
        <>
          <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} direction="column" justifyContent="center" alignItems="center">

            <div className="diasSemana">
              {diasSemana.map((dia, index) => (
                <div key={index} className="cellDA">{dia}</div>
              ))}
            </div>

            {bloquesAmbientes.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <React.Fragment key={`${rowIndex}-${colIndex}`}>
                    {colIndex === 0 ? (
                      <div className='estiloHorario'>{horario[rowIndex]}</div>
                    ) : null}

                    <div
                      className={`cellDA ${cell === 0 ? 'red' : 'green'}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    />
                  </React.Fragment>
                ))}
              </div>
            ))}

            <div className="contenedorDND">
              <span className="availability">Disponible</span>
              <div className="circle green"></div>
              <span className="availability">No disponible</span>
              <div className="circle red"></div>
            </div>

          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '25px', marginTop: '25px' }}>
            <h2>Configuración de capacidad del ambiente: </h2>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                sx={{ mb: 3, width: '100%' }}
                type="number"
                value={capacidadMin}
                onChange={manejadorCambiosCapacidadMin}
                onBlur={validarCapacidadMin}
                error={errorCapacidadMin}
                helperText={errorCapacidadMin ? mensajeErrorCapacidadMin : ''}
                label="Capacidad Minima: "
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ mb: 3, width: '100%' }}
                value={capacidadActual}
                InputProps={{
                  readOnly: true,
                }}
                label="Capacidad Actual:  "
              />

            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ mb: 3, width: '100%' }}
                type='number'
                value={capacidadMax}
                onChange={manejadorCambiosCapacidadMax}
                onBlur={validarCapacidadMax}
                error={errorCapacidadMax}
                helperText={errorCapacidadMax ? mensajeErrorCapacidadMax : ''}
                label="Capacidad Maxima:  "
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" onClick={manejarEnvio} sx={{ width: '250px', marginTop: '18px' }} className='formboton'>
            GUARDAR DISPONIBILIDAD
          </Button>
        </>
      )
      }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ChildModal handleClose={handleClose} />
      </Modal>

      {
        mostrarAlerta && (
          <Alert
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1rem',

            }}
            variant="filled"
            severity="error"
          >
            Verifique los datos.
          </Alert>

        )
      }
    </Box >
  );

}

export default DisponibilidadAmbiente;

{/* <Grid >
<Grid item xs={12} sm={12} md={6} lg={6} xl={6} >

</Grid>

<Grid item xs={12} sm={12} md={6} lg={6} xl={6} >

</Grid>

<h1>{capacidadActual}</h1>

</Grid> */}