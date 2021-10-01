import React, { useState } from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import Input from '../Input';

function Infos({
  onChangeTime,
  onChangePortions,
  defaultPortions,
  defaultTime,
}) {
  const classes = useStyles();
  const [symbolsArr] = useState(['e', 'E', '+', '-', '.']);

  function handleTextChange(e, callback) {
    e.target.value = e.target.value.replace(/-/g, '');
    callback(e.target.value);
  }

  return (
    <div className={classes.infos}>
      <Input
        className={classes.inputs}
        type="number"
        hiddenLabel
        placeholder="60"
        inputProps={{ min: 0, style: { textAlign: 'center' } }}
        onChange={e => handleTextChange(e, onChangeTime)}
        onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
        defaultValue={defaultTime === isNaN ? '' : defaultTime}
        maxSize={3}
        onInput={e => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 3);
        }}
      />
      <span> Minutos </span>

      <Input
        className={classes.inputs}
        onInput={e => {
          e.target.value = Math.max(0, parseInt(e.target.value))
            .toString()
            .slice(0, 3);
        }}
        type="number"
        hiddenLabel
        placeholder="7"
        inputProps={{ min: 0, style: { textAlign: 'center' } }}
        onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
        onChange={e => handleTextChange(e, onChangePortions)}
        defaultValue={defaultPortions === isNaN ? '' : defaultPortions}
        maxSize={3}
      />
      <span> Porções </span>
    </div>
  );
}

Infos.propTypes = {
  onChangeTime: PropTypes.func,
  onChangePortions: PropTypes.func,
};

Infos.defaultProps = {
  onChangeTime: () => {},
  onChangePortions: () => {},
};

export default Infos;
