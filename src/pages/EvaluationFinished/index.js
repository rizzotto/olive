import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import EmptyGeneric from '../../components/EmptyGeneric';
import { AppContext } from '../../context/AppProvider';
import useStyles from './styles';
import StyledDiv from '../../utils/styledDiv';

export default function EvaluationFinished() {
  const classes = useStyles();
  const history = useHistory();

  const { setRenderNavBar } = useContext(AppContext);

  useEffect(() => {
    setRenderNavBar(true);
  });

  return (
    <div className={classes.emptyState}>
      <EmptyGeneric
        title="Feedback Enviado!"
        description="O criador da receita já recebeu a avaliação"
      />

      <StyledDiv style={{ marginBottom: 50 }}>
        <Button
          style={{ width: 220 }}
          text="Voltar para o Feed"
          onClick={() => history.push('/')}
          color="secondary"
        />
      </StyledDiv>
    </div>
  );
}
