import React, { useState } from 'react';
import { Slider as MaterialSlider } from '@material-ui/core';
import useStyles from './styles';
import PropTypes from 'prop-types';

function Slider({ initialValue, onChange, ...others }) {
  const classes = useStyles();
  var [value, setValue] = useState(initialValue);

  const handleChange = (event, value) => {
    setValue(value);
    onChange(value);
  };

  return (
    <div className={classes.sliderContainer}>
      <MaterialSlider
        className={classes.slider}
        defaultValue={initialValue}
        step={1}
        min={0}
        max={10}
        onChange={handleChange}
        valueLabelDisplay="off"
        {...others}
      />
      <span className={classes.sliderLabel}>{value}/10</span>
    </div>
  );
}

Slider.propTypes = {
  initialValue: PropTypes.number,
  onChange: PropTypes.func,
};

Slider.defaultProps = {
  initialValue: 0,
  onChange: () => {},
};

export default Slider;
