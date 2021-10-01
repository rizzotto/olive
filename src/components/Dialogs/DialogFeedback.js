import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import {
  Button as MaterialButton,
  DialogContentText,
  DialogContent,
} from '@material-ui/core';
import useStyles from './DialogFeedback.styles';

function DialogFeedback({
  open,
  handleOnClose,
  handleOptionEdit,
  handleOptionFinish,
  status,
  feedback,
}) {
  const classes = useStyles({ status });

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
      <DialogTitle id="alert-dialog-title">
        Sua receita foi avaliada!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <span>
            Status:{' '}
            <span className={classes.status}>
              {status == 'R' ? 'Reprovada' : 'Aprovada'}
            </span>
          </span>
          <div>Feedback: {feedback} </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <MaterialButton onClick={handleOptionEdit} style={{ color: '#FF1B25' }}>
          Editar Receita
        </MaterialButton>
        {status == 'A' ? (
          <MaterialButton
            onClick={handleOptionFinish}
            color="primary"
            autoFocus
          >
            Concluir
          </MaterialButton>
        ) : null}
      </DialogActions>
    </Dialog>
  );
}

export default DialogFeedback;
