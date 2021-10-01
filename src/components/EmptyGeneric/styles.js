import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  },
  image: {
    width: '250px',
    height: '120px',
  },
  title: {
    width: '80%',
    lineHeight: 1.2,
    margin: 20,
  },
  description: {
    lineHeight: 1.2,
    fontSize: '17px',
    width: '80%',
    margin: 0,
    fontWeight: '500',
    color: theme.palette.grey.darker,
  },
}));

export default useStyles;
