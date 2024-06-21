import React, { forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmDeleteModal = forwardRef(({ open, handleClose, handleDelete }, ref) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            ref={ref}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Confirmar Eliminación"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Estás a punto de eliminar el periodo de examenes. ¿Deseas continuar?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    Eliminar
                </Button>
                <Button onClick={handleClose} color="secondary">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
});

export default ConfirmDeleteModal;
