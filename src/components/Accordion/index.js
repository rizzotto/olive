import React from 'react';
import { Accordion } from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core';
import { AccordionDetails } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles';
import PropTypes from 'prop-types';
import theme from '../../constants/theme';

export default function AccordionComponent({ id, title, description }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        className={classes.container}
        expanded={expanded === id}
        key={id}
        onChange={handleChange(id)}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon style={{ color: theme.palette.primary.main }} />
          }
        >
          <Typography className={classes.title}>{title}</Typography>
        </AccordionSummary>

        {description.map((details, index) => {
          return (
            <AccordionDetails key={index}>
              <Typography className={classes.description}>{details}</Typography>
            </AccordionDetails>
          );
        })}
      </Accordion>
    </div>
  );
}

AccordionComponent.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.array,
};

AccordionComponent.defaultProps = {
  title: '',
  description: '',
};
