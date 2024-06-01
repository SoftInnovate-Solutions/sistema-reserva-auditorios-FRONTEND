import React, { forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const ModalAvisoPeriodo = forwardRef(({ open, handleClose }, ref) => {
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
                    <DialogContentText id="alert-dialog-description">
                        No está habilitado.
                    </DialogContentText>
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
