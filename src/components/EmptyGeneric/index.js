import React from 'react';
import useStyles from './styles';
import LogoOlive from '../../assets/logo.svg';
import PropTypes from 'prop-types';

export default function EmptyGeneric({ title, description }) {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <img className={classes.image} src={LogoOlive} />
      <h1 className={classes.title}>{title}</h1>
      <h4 className={classes.description}>{description}</h4>
    </div>
  );
}

EmptyGeneric.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

EmptyGeneric.defaultProps = {
  title: '',
  description: '',
};
