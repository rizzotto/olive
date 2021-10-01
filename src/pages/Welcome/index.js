import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppProvider';
import EmptyGeneric from '../../components/EmptyGeneric';
import useStyles from './styles';

export default function Onboarding() {
  const classes = useStyles();
  const history = useHistory();
  const { authUser } = useContext(AppContext);

  const nextScreen = () => {
    history.push('/preferences');
  };
  return (
    <div className={classes.page}>
      <div></div>
      <div>
        <EmptyGeneric
          title={'Olá, ' + authUser.displayName.split(' ')[0]}
          description="Bem-vindo ao Olive, que tal começarmos sua nova jornada gastronômica?"
        />
      </div>
      <div></div>

      <Button
        style={{ width: 220 }}
        color="primary"
        text="Vamos lá!"
        onClick={nextScreen}
      />
    </div>
  );
}
