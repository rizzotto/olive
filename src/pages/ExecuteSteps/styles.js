import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  description: {
    fontSize: 36,
    marginBottom: 50,
  },
  content: {
    marginTop: 30,
    fontSize: 36,
    '& img': {
      maxWidth: '100%',
      borderRadius: 20,
    },
  },
  headerStepBack: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  navigationHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // '& button': {
    //   marginLeft: 'auto',
    // },
  },
}));

export default useStyles;
