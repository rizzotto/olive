import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profile: {
    backgroundColor: theme.palette.base.secondary,
    padding: 15,
    borderRadius: 500,
  },
  content: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
  },
  icon: {
    fontSize: 40,
    color: 'white',
  },

  border: {
    backgroundColor: theme.palette.primary.main,
    padding: 10,
    borderRadius: 500,
    display: 'inline-block',
  },
}));

export default useStyles;
