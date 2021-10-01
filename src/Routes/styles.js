import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'space-between',
  },
  content: {
    height: '100%',
    overflowY: 'auto',
    padding: 20,
  },
}));

export default useStyles;
