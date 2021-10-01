import React from 'react';
import { Button as MaterialButton } from '@material-ui/core';
import useStyles from './styles';
import PropTypes from 'prop-types';

export default function Button({ text, ...others }) {
  const classes = useStyles();

  return (
    <MaterialButton className={classes.button} {...others}>
      {text}
    </MaterialButton>
  );
}

// Defina aqui qual o tipo da prop
Button.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.string,
};

// Defina aqui o valor padrão de cada prop
Button.defaultProps = {
  text: 'Botão',
  variant: 'contained',
};
