import React from 'react';
import { TextField } from '@material-ui/core';
import useStyles from './styles';
import PropTypes from 'prop-types';

function Input({
  rows,
  multiline,
  variant,
  label,
  placeholder,
  InputProps,
  ...others
}) {
  const classes = useStyles();

  return (
    <TextField
      label={label}
      fullWidth
      variant={variant}
      rows={rows}
      multiline={multiline}
      placeholder={placeholder}
      InputProps={{
        classes,
        className: classes.input,
        disableUnderline: true,
        ...InputProps,
      }}
      {...others}
    />
  );
}

// Defina aqui qual o tipo da prop
Input.propTypes = {
  label: PropTypes.string,
  rows: PropTypes.number,
  multiline: PropTypes.bool,
  variant: PropTypes.string,
  InputProps: PropTypes.object,
};

// Defina aqui o valor padrão de cada prop
Input.defaultProps = {
  label: undefined,
  rows: 1,
  multiline: false,
  variant: 'filled',
  placeholder: undefined,
  InputProps: {},
};

export default Input;
