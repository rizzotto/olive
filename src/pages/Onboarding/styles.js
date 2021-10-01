import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  page: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    height: 250,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    color: theme.palette.grey.darker,
    fontWeight: '500',
    width: '80%',
    fontSize: 17,
    margin: 0,
    height: 50,
  },
  pagination: {
    display: 'flex',
  },
  index: {
    width: 10,
    margin: 15,
    marginTop: 40,
    height: 10,
    backgroundColor: theme.palette.grey.medium,
    borderRadius: 50,
  },
  indexSelected: {
    width: 10,
    margin: 15,
    marginTop: 40,
    height: 10,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 50,
  },
}));

export default useStyles;
