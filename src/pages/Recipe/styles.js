import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: 30,
    fontSize: 36,
    '& img': {
      width: '100%',
      borderRadius: 20,
    },
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  progressContainer: {
    height: 8,
    margin: '8px 0',
    borderRadius: 12,
    width: '100%',
    backgroundColor: theme.palette.primary.gradient10,
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  navigationHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export default useStyles;
