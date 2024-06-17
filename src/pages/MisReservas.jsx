import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ModalPeriodo from '../components/modalAvisoDocAux'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MisReservas = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const periodoReserva = JSON.parse(localStorage.getItem('periodos'));
  const [idUsuario] = useState(sessionStorage.getItem('cod_usuario'));
  const [rol] = useState(sessionStorage.getItem('rol_usuario'))
  const NombreUsuario = sessionStorage.getItem('nombre_usuario');
  const [reservas, setReservas] = useState([]);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const [estaHabilitado, setEstaHabilitado] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const handleEliminarReserva = (id) => {
    fetch(`http://127.0.0.1:5000/reserva/delete/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
        return response.json();
      })
      .then(data => {
        // Maneja la respuesta si es necesario
        console.log('Reserva eliminada:', data);
        fetchReservas();
        setOpenSuccessModal(true);
      })
      .catch(error => console.error('Error al eliminar la reserva:', error));
  };

  const handleVerReserva = (id) => {
    // console.log(id);
    // console.log(reservas[id-1]);

    // setReservaSeleccionada(reservas[id-1])

    fetch(`http://127.0.0.1:5000/reserva/one/${id}`)
      .then(response => response.json())
      .then(data => setReservaSeleccionada(data))
      .catch(error => console.error("Error al carga imparticiones:", error));

  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/reserva/all/${idUsuario}`)
      .then(response => response.json())
      .then(data => {
        // Añadir un id a cada elemento del array
        const dataConIds = data.map((element, index) => {
          return { ...element, id: index + 1 }; 
        });

        // Establecer las reservas con los ids añadidos
        setReservas(dataConIds);
      })
      .catch(error => console.error("Error al carga imparticiones:", error));
    if (rol === 'Docente') {
      fetch(`http://127.0.0.1:5000/periodo_reserva/periodo_docente`)
        .then(response => response.json())
        .then(data => {
          if (data.existe === 1) {
            setEstaHabilitado(true);
          } else {
            setFechaInicio(periodoReserva[0].docenteInicio);
            setFechaFin(periodoReserva[0].docenteFin);
          }
        })
        .catch(error => console.error("Error al carga imparticiones:", error));
    } else {
      fetch(`http://127.0.0.1:5000/periodo_reserva/periodo_auxiliar`)
        .then(response => response.json())
        .then(data => {
          if (data.existe === 1) {
            setEstaHabilitado(true);
          } else {
            setFechaInicio(periodoReserva[0].auxiliarInicio);
            setFechaFin(periodoReserva[0].auxiliarFin)
          }
        })
        .catch(error => console.error("Error al carga imparticiones:", error));
    }
  }, []);

  const fetchReservas = () => {
    fetch(`http://127.0.0.1:5000/reserva/all/${idUsuario}`)
      .then(response => response.json())
      .then(data => setReservas(data))
      .catch(error => console.error("Error al cargar reservas:", error));
  }

  const handleReservarAmbiente = () => {
    if (estaHabilitado) {
      navigate('/calendario', { state: { reservas: reservas } });
    } else {
      handleOpenModalPeriodo();
    }
  };

  //variables para el modal de aviso del periodo
  const [openModalPeriodo, setOpenModalPeriodo] = useState(false);

  const handleOpenModalPeriodo = () => {
    setOpenModalPeriodo(true);
  };

  const handleCloseModalPeriodo = () => {
    setOpenModalPeriodo(false);
  };


  const handleCloseModal = () => {
    setReservaSeleccionada(null);
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);
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
      <div>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" component="h2" sx={{ mb: 2, color: theme.palette.text.primary, textAlign: 'center' }}>MIS RESERVAS</Typography>
          { }
          <button
            onClick={handleReservarAmbiente}
            className="bg-primary text-white px-4 py-2 rounded-md"
            variant="contained"
            color="primary"
          >
            Reservar Ambiente
          </button>
        </div>
        <div className="bg-gray-100 p-4 shadow-md rounded-md">
          { }
          <ul className="mt-4 space-y-4">
            {reservas.map(reserva => (
              <li key={reserva.cod_reserva} className="p-4 bg-gray rounded-lg shadow flex justify-between items-center">
                <div className="flex-1 pr-4">
                  <div className="font-bold text-lg">{reserva.ambiente}</div>
                  <div className="text-gray-500">{reserva.materia} - {reserva.grupo}</div>
                  <div className="text-gray-500">{reserva.fecha_res}</div>
                  <div className="text-gray-500">{reserva.hora}</div>
                </div>
                <div className="bg-gray-500 p-2 rounded flex flex-col space-y-2">
                  <button
                    onClick={() => handleVerReserva(reserva.cod_reserva)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Ver Reserva
                  </button>
                  <button
                    onClick={() => handleEliminarReserva(reserva.cod_reserva)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

        </div>

        { }
        {reservaSeleccionada && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-lg font-semibold mb-4">DETALLES DE LA RESERVA</h3>
              <strong> {reservaSeleccionada.fecha_res}</strong>
              <p><strong>{reservaSeleccionada.hora}</strong></p>
              <p><strong>Ambiente:</strong> {reservaSeleccionada.ambiente}</p>
              {/* <p><strong>Reservado por:</strong> {NombreUsuario}</p> */}
              <p><strong>Reservado por:</strong> {reservaSeleccionada.instructor}</p>
              <p><strong>Materia:</strong> {reservaSeleccionada.materia}</p>
              <p><strong>Grupo:</strong> {reservaSeleccionada.grupo}</p>
              <p><strong>Cantidad de estudiantes:</strong> {reservaSeleccionada.numero_estudiantes}</p>
              <button onClick={handleCloseModal} className="bg-primary text-white px-4 py-2 rounded-md mt-4">Cerrar</button>
            </div>
          </div>
        )}
      </div>
      <ModalPeriodo
        rol={rol}
        fechaInicio={fechaInicio}
        fechaFin={fechaFin}
        open={openModalPeriodo}
        handleClose={handleCloseModalPeriodo}
      />
      <Dialog
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
      >
        <DialogTitle>Reserva Eliminada</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La reserva ha sido eliminada exitosamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

export default MisReservas;
