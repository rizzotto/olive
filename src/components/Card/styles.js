import { makeStyles } from '@material-ui/styles';

function getDifficultyColor(difficulty) {
  const difficultyColorMap = {
    1: '#52944F',
    2: '#52944F',
    3: '#52944F',
    4: '#52944F',
    5: '#FFCE00',
    6: '#FFCE00',
    7: '#FFCE00',
    8: '#FF6E61',
    9: '#FF6E61',
    10: '#FF6E61',
  };

  return difficultyColorMap[difficulty];
}

function getStatusColor(status) {
  const statusColorMap = {
    A: '#52944F',
    P: '#FFCE00',
    R: '#FF6E61',
  };

  return statusColorMap[status];
}

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 20,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  content: {
    '&.MuiCardContent-root': {
      padding: '6px 16px',
    },
  },
  actions: {
    width: '100%',
    justifyContent: 'space-between',
    '&.MuiCardActions-root': {
      '&.MuiCardActions-spacing': {
        padding: '0 5px 0 16px',
      },
    },
  },
  tag: {
    position: 'absolute',
    textAlign: 'center',
    top: 10,
    left: 10,
    color: 'white',
    backgroundColor: props =>
      props.showStatus
        ? getStatusColor(props.status)
        : getDifficultyColor(props.difficulty),
    padding: '6px 10px',
    borderRadius: 21,
    letterSpacing: 0.9,
  },
}));

export default useStyles;
