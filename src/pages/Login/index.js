import { CircularProgress } from '@material-ui/core';
import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Redirect } from 'react-router-dom';
import LogoOlive from '../../assets/logotype.svg';
import Button from '../../components/Button';
import { AppContext } from '../../context/AppProvider';
import useStyles from './styles';

export default function Login() {
  const classes = useStyles();

  const {
    authUser,
    doSignIn,
    loading,
    isNewUser,
    setRenderNavBar,
  } = useContext(AppContext);

  if (authUser) {
    if (isNewUser) return <Redirect to="/welcome"></Redirect>;
    setRenderNavBar(true);
    return <Redirect to="/recipes"></Redirect>;
  }

  return (
    <div className={classes.page}>
      <div></div>
      <img className={classes.image} src={LogoOlive} />
      {!authUser && !loading && (
        <div className={classes.buttons}>
          <Button
            fullWidth
            style={{
              backgroundColor: '#DD4B39',
              color: '#FFF',
              marginBottom: 20,
            }}
            text="Entrar com o Google"
            onClick={doSignIn}
            startIcon={<FaGoogle color="white" style={{ marginRight: 10 }} />}
          />
        </div>
      )}
      {loading && <CircularProgress color="secondary" />}
      <div></div>
    </div>
  );
}
