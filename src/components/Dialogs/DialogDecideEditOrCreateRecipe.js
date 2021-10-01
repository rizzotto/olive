import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import {
  Button as MaterialButton,
  DialogContentText,
  DialogContent,
} from '@material-ui/core';

function DialogDecideEditOrCreateRecipe({
  open,
  handleOnClose,
  handleOptionYes,
  handleOptionNo,
}) {
  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: 12 },
      }}
      open={open}
      onClose={handleOnClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Descartar receita?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Você possui uma edição em andamento, deseja continuar editando ou
          criar uma nova receita?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <MaterialButton onClick={handleOptionYes} style={{ color: '#FF1B25' }}>
          Continuar Editando
        </MaterialButton>
        <MaterialButton onClick={handleOptionNo} color="primary" autoFocus>
          Criar Nova Receita
        </MaterialButton>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDecideEditOrCreateRecipe;
