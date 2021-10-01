import React from 'react';
import Button from '../../components/Button';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import theme from '../../constants/theme';

function RecipeCreated() {
  const history = useHistory();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Logo />
        <h1 style={{ textAlign: 'center' }}>Receita enviada para avaliação</h1>
        <span style={{ color: theme.palette.grey.darker }}>
          Obrigado por contribuir para o Olive!
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <p style={{ textAlign: 'center', color: theme.palette.grey.darker }}>
          Verifique o status de sua receita na tela de criação
        </p>
        <Button
          text="Voltar para as Criações"
          color="secondary"
          onClick={() => history.push('/creations')}
        />
      </div>
    </div>
  );
}

export default RecipeCreated;
