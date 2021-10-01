import React from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import LinearProgressWithLabel from '../../components/LinearProgressWithLabel';
import { ReactComponent as Trophy } from '../../assets/trophy.svg';
import { ReactComponent as TrophyPlatin } from '../../assets/trophyPlatin.svg';
import { Grow } from '@material-ui/core';
// import { useState } from 'react';

function Achievement({ disabled, total, progress, main, tag, ...others }) {
  const classes = useStyles({ disabled });
  // Future animation
  // const [value, setValue] = useState();

  // useEffect(() => {
  //   setValue(progress);
  // }, []);

  return (
    <Grow in>
      <div className={classes.container} {...others}>
        {main ? (
          <TrophyPlatin style={{ filter: disabled && 'grayscale(1)' }} />
        ) : (
          <Trophy style={{ filter: disabled && 'grayscale(1)' }} />
        )}
        <div className={classes.content}>
          {tag ? (
            <div className={classes.title}>Receitas com a tag {tag}</div>
          ) : (
            <div className={classes.title}>Complete {total} Receitas</div>
          )}
          <LinearProgressWithLabel
            achievement
            disabled={disabled}
            value={progress}
            total={total}
          />
        </div>
      </div>
    </Grow>
  );
}

Achievement.propTypes = {
  disabled: PropTypes.bool,
  isButton: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

Achievement.defaultProps = {
  disabled: false,
  isButton: false,
  onClick: () => {},
  selected: false,
};

export default Achievement;
