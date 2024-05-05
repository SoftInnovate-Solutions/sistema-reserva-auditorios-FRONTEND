import React, { forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmUpdateModal = forwardRef(({ open, handleClose, handleConfirm }, ref) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            ref={ref}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Confirmar Actualización"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Estás a punto de actualizar los detalles del ambiente. ¿Deseas continuar?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Actualizar
                </Button>
                <Button onClick={handleClose} color="secondary">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default ConfirmUpdateModal;