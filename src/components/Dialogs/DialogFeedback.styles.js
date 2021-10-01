import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  label: {
    color: theme.palette.secondary.main,
  },
  status: {
    fontSize: 15,
    color: props => (props.status === 'R' ? 'red' : 'green'),
  },
  statusLabel: {
    display: 'flex',
  },
}));

export default useStyles;
