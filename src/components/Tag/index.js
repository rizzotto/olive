import React from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';

function Tag({
  customStyle,
  disabled,
  isButton,
  name,
  onClick,
  selected,
  ...others
}) {
  const classes = useStyles({ disabled, selected, isButton });

  const Component = isButton ? 'button' : 'div';

  return (
    <Component
      onClick={isButton ? onClick : undefined}
      style={customStyle}
      className={classes.root}
      {...others}
    >
      {name}
    </Component>
  );
}

Tag.propTypes = {
  isButton: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

Tag.defaultProps = {
  isButton: false,
  onClick: () => {},
  selected: false,
};

export default Tag;
