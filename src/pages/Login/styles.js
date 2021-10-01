import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    width: '100%',
  },
}));

export default useStyles;
