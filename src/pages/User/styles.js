import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  profile: {
    backgroundColor: theme.palette.base.secondary,
    padding: 20,
    borderRadius: 500,
    display: 'inline-block',
  },
  content: {
    textAlign: 'center',
  },
  border: {
    backgroundColor: props => props.borderColor,
    padding: 15,
    borderRadius: 500,
    display: 'inline-block',
  },
}));

export default useStyles;
