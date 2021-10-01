import React, { useContext, useEffect, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button as MaterialButton,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { AppContext } from '../../context/AppProvider';
import useStyles from './styles';
import StyledDiv from '../../utils/styledDiv';
import RecipesApi from '../../services/RecipesAPI';

export default function RecipeFinished(props) {
  const classes = useStyles();
  const history = useHistory();
  const { recipe_id } = props.location.state;
  const { setRenderNavBar } = useContext(AppContext);
  const [evaluation, setEvaluation] = useState('');
  const [approveModal, setApproveModal] = useState(false);
  const [reproveModal, setReproveModal] = useState(false);

  const handlePreviousStep = () => {
    history.push(`/recipes/${recipe_id}`);
  };

  useEffect(() => {
    setRenderNavBar(true);
  });

  const handleOnChange = e => {
    setEvaluation(e.target.value);
  };

  const handleCloseModal = () => {
    setApproveModal(false);
    setReproveModal(false);
  };

  const handleApprove = async () => {
    var postObject = {
      recipe_id,
      status: 'A',
      feedback: evaluation,
    };

    await RecipesApi().patchRecipe(postObject);
    history.push(`/evaluation-finished`);
  };

  const handleRepprove = async () => {
    var postObject = {
      recipe_id,
      status: 'R',
      feedback: evaluation,
    };

    await RecipesApi().patchRecipe(postObject);
    history.push(`/evaluation-finished`);
  };

  function getModal(action) {
    return (
      <Dialog
        open={action == 'aprovar' ? approveModal : reproveModal}
        onClose={handleCloseModal}
        PaperProps={{
          style: { borderRadius: 12 },
        }}
      >
        <DialogTitle style={{ paddingBottom: 4 }} id="alert-dialog-title">
          {`Você quer ${action} a receita?`}
        </DialogTitle>
        <DialogContent>
          <div style={{ marginBottom: 6, color: 'gray' }}>
            {`Tem certeza que você quer ${action} essa receita e enviar esse
            feedback?`}
          </div>
        </DialogContent>
        <DialogActions>
          <MaterialButton
            onClick={handleCloseModal}
            style={{ color: '#FF1B25' }}
            autoFocus
          >
            Não
          </MaterialButton>
          <MaterialButton
            onClick={() =>
              action == 'aprovar' ? handleApprove() : handleRepprove()
            }
            color="primary"
            autoFocus
          >
            Sim
          </MaterialButton>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <span
          className={classes.headerStepBack}
          onClick={e => handlePreviousStep(e)}
        >
          Cancelar
        </span>
      </div>
      <h1>Análise</h1>
      <h2>Dê um feedback</h2>

      <Input rows={15} multiline label="Feedback" onChange={handleOnChange} />

      <StyledDiv style={{ bottom: 50, paddingLeft: 20, paddingRight: 20 }}>
        <Button
          color="secondary"
          fullWidth
          style={{ backgroundColor: '#EA1136' }}
          text="Reprovar"
          onClick={() => setReproveModal(true)}
        />
        <div style={{ width: 20 }} />
        <Button
          fullWidth
          color="secondary"
          text="Aprovar"
          onClick={() => setApproveModal(true)}
        />
      </StyledDiv>
      {getModal('reprovar')}
      {getModal('aprovar')}
    </div>
  );
}
