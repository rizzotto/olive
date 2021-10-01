import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  step: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    borderRadius: 12,
    border: `1px solid ${theme.palette.secondary.main}`,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 400,
    minWidth: 280,
  },
  content: {
    height: '100%',
    position: 'relative',
    padding: 20,
    marginLeft: 14,
  },
  input: {
    marginBottom: 10,
  },
  number: {
    height: 20,
    width: 20,
    padding: 15,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    position: 'absolute',
    top: 5,
    left: 5,
  },
}));

export default useStyles;
