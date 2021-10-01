import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  steps: {
    display: 'flex',
    overflowX: 'auto',
    width: '100%',
  },
  emptyState: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  navigationHeader: {
    display: 'flex',
    marginLeft: 'auto',
  },
}));

export default useStyles;
