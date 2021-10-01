import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  headerStepBack: {
    fontWeight: 'bold',
    color: theme.palette.error.main,
  },
}));

export default useStyles;
