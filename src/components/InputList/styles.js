import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  list: {
    textAlign: 'center',
  },
  row: {
    display: 'flex',
    width: '100%',
    marginBottom: 15,
  },
  container: {
    overflowY: 'auto',
    height: '100%',
    marginBottom: '10px',
  },
  warningContainer: {
    marginTop: '30px',
    marginBottom: '30px',
  },
  warning: {
    fontWeight: 'bold',
    color: theme.palette.grey.darker,
  },

  '& .MuiInput-input': {
    backgroundColor: theme.typography.primary,
  },
}));

export default useStyles;
