import React, { useState, useEffect, forwardRef } from 'react';
import Box from "@mui/material/Box";
import { Typography, useTheme, Grid, Button, TextField, Modal, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import './DisponibilidadAmbiente.css';

// Estilo para el modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  textAlign: 'center',
};

function DisponibilidadAmbiente() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const handleClose = () => { setOpen(false); manejarEnvio; navigate('/administrar-ambiente'); }

  const { id } = useParams();
  const theme = useTheme();
  const diasSemana = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
  const horario = ["06:45 - 08:15 ", "08:15 - 09:45 ", "09:45 - 11:15 ", "11:15 - 12:45", "12:45 - 14:15", "14:15 - 15:45",
    "15:45 - 17:15", "17:15 - 18:45", "18:45 - 20:15", "20:15 - 21:45"];
  const initialGrid = Array.from({ length: 10 }, () => Array(7).fill(1));
  const [grid, setGrid] = useState(initialGrid);
  const [capacidadMin, setCapacidadMin] = useState('');
  const [errorCapacidadMin, setErrorCapacidadMin] = useState(false);
  const [mensajeErrorCapacidadMin, setMensajeErrorCapacidadMin] = useState('');
  const [capacidadMax, setCapacidadMax] = useState('');
  const [errorCapacidadMax, setErrorCapacidadMax] = useState(false);
  const [mensajeErrorCapacidadMax, setMensajeErrorCapacidadMax] = useState('');

  const [general_inicio, setGeneral_inicio] = useState('');
  const [general_final, setGeneral_final] = useState('');

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/ambiente/one_setting/${id}`)
      .then(response => response.json())
      .then(data => {
        setCapacidadMax(data.albergacion_max_amb);
        setCapacidadMin(data.albergacion_min_amb);
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, [id]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/periodo_reserva/periodo_general`)
      .then(response => response.json())
      .then(data => {
        setGeneral_final(data.fecha_fin_general_per);
        setGeneral_inicio(data.fecha_inicio_general_per);
      })
      .catch(error => console.error("Error al cargar los tipos de ambiente:", error));
  }, [id]);

  //Validaciones y control de inputs
  const manejadorCambiosCapacidadMin = (event) => {
    const inputNumero = event.target.value;
    if (/^\d*$/.test(inputNumero)) {
      setCapacidadMin(inputNumero);
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
      setCapacidadMax(inputNumero);
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
      setMensajeErrorCapacidadMax('la capacidad es requerido.');
      setErrorCapacidadMax(true);
      return true;
    }

    if (capacidadMax.length > 4) {
      setMensajeErrorCapacidadMax('La capacidad no debe exceder los 4 cifras');
      setErrorCapacidadMax(true);
      return true;
    }
    setMensajeErrorCapacidadMax('');
    setErrorCapacidadMax(false);
    return false;
  }

  const validarMinMax = () => {
    if(capacidadMin<capacidadMax){
      return false;
    }else{
      setMensajeErrorCapacidadMax('La capacidad debe ser un valor maximo.');
      setMensajeErrorCapacidadMin('La capacidad debe ser un valor minimo');
      setErrorCapacidadMax(true);
      setErrorCapacidadMin(true);
      return true;
    }
  }

  const validarTodosLosInputs = () => {
    validarCapacidadMin(); validarCapacidadMax
    return !validarCapacidadMin() && !validarCapacidadMax();
  }


  // Manejar el clic en una celda
  const handleCellClick = (rowIndex, colIndex) => {
    const newGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) {
          return cell === 0 ? 1 : 0; // Cambiar entre 0 y 1
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  //ENVIO FORMULARIO
  const manejarEnvio = async () => {

    if (validarTodosLosInputs() && !validarMinMax()) {
      try {
        await enviarPeriodo();
        // console.log("++++++ => Formulario enviado");
        if (!open) {
          handleOpen();
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    } else {
      setMostrarAlerta(true);
      // console.log("---------- => NAAAAAAAADA QUE ENVIAR");
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataCapacidad),
      });

      if (response.ok) {
        console.log('ambiente ajustado correctamente');
      } else {
        const errorMessage = await response.text();
        console.error('Error al actualizar el periodo:', errorMessage);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  // Declaración, añadir varibales necesarias y uso de funcionalidad 
  const [formData, setFormData] = useState("");
  const [formDataCapacidad, setFormDataCapacidad] = useState("");

  const rellenarDatos = () => {
    const idd = parseInt(id)
    const datosAutocompletados = {
      cod_ambiente: idd,  // Reemplaza con el valor adecuado si es necesario
      configuracion: grid,
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

  //#region ----------------- IMPLEMENTACIÓN DEL ALERT Y MODAL ------------------------------------------------------------------------------------------------------ 
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const ChildModal = forwardRef(({ handleClose }, ref) => {
    return (
      <Box ref={ref} sx={style} tabIndex={0}>
        <span style={{ fontSize: '48px', color: '#4caf50', display: 'block', marginBottom: '16px' }}>&#10003;</span>
        <h2 id="child-modal-title">Guardado correctamente</h2>
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

  useEffect(() => {
    rellenarDatos();
  }, [capacidadMin, capacidadMax, setFormData]);

  //#endregion

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

      <Typography variant="h5" component="h2" sx={{ mb: 5, color: theme.palette.text.primary }}>DISPONIBILIDAD DE AMBIENTE</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <h2>Configuración de disponibilidad:</h2>
      </Box>

      <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} direction="column" justifyContent="center" alignItems="center">
        <div className="diasSemana">
          {diasSemana.map((dia, index) => (
            <div key={index} className="cellDA">{dia}</div>
          ))}
        </div>
        {grid.map((row, rowIndex) => (
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

      <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} direction="column" justifyContent="center" alignItems="center">
        <TextField
          sx={{ mb: 3, width: '20%' }}
          className='form-inputs'
          value={capacidadMin}
          onChange={manejadorCambiosCapacidadMin}
          onBlur={validarCapacidadMin}
          error={errorCapacidadMin}
          helperText={errorCapacidadMin ? mensajeErrorCapacidadMin : ''}
          label="Capacidad Minima: "
          variant="standard"
        />
        <TextField
          sx={{ mb: 3, width: '20%' }}
          className='form-inputs'
          value={capacidadMax}
          onChange={manejadorCambiosCapacidadMax}
          onBlur={validarCapacidadMax}
          error={errorCapacidadMax}
          helperText={errorCapacidadMax ? mensajeErrorCapacidadMax : ''}
          label="Capacidad Maxima:  "
          variant="standard"
        />
      </Grid>

      <Button type="submit" variant="contained" onClick={manejarEnvio} sx={{ marginTop: '18px' }} className='formboton'>
        GUARDAR DISPONIBILIDAD
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ChildModal handleClose={handleClose} />
      </Modal>

      {mostrarAlerta && (
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

      )}
    </Box>
  );

}

export default DisponibilidadAmbiente;
