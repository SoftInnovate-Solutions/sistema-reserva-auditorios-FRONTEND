import React, { forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const ModalAvisoPeriodo = forwardRef(({ rol, fechaInicio, fechaFin, open, handleClose }, ref) => {

    const invertirFechas = (periodo) => {
        const [year, month, day] = periodo.split("-");
        const fechaReformateado = `${day}/${month}/${year}`;

        return `${fechaReformateado}`;
    };

    console.log(fechaInicio);
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            ref={ref}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth={true}
        >
            <Box>
                <DialogTitle id="alert-dialog-title">{"Aviso"}</DialogTitle>
                <DialogContent>
                    {fechaInicio != "" ? (
                        <DialogContentText id="alert-dialog-description">
                            Usted no puede realizar la reserva, ya que el periodo de reservas para {rol}, es del {invertirFechas(fechaInicio)} al {invertirFechas(fechaFin)}.
                        </DialogContentText>
                    ) : (
                        <DialogContentText id="alert-dialog-description">
                            No existe periodos de reservas disponibles.
                        </DialogContentText>
                    )}

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Cerrar
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
});

export default ModalAvisoPeriodo;
