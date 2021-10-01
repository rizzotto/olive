import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
  },
  buttons: {
    textAlign: 'center',
  },
}));

export default useStyles;
