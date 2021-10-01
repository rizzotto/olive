import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function LinearProgressWithLabel({
  achievement,
  disabled,
  value,
  ...others
}) {
  const classes = useStyles({ achievement, disabled });
  const percentValue = (value / others.total) * 100;

  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress
          classes={{
            root: classes.root,
            colorPrimary: classes.colorPrimary,
            barColorPrimary: classes.barColorPrimary,
          }}
          variant="determinate"
          value={percentValue}
          {...others}
        />
      </Box>
      <Box>
        <Typography variant="body2">{`${Math.round(value)}/${
          others.total
        }`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
