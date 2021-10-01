import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: '100px',
  },
  button: {
    borderRadius: 10,
    width: '221px',
    left: '60px',
    textTransform: 'none',
    marginTop: '20px',
  },
  textInfo: {
    marginLeft: '7px',
    marginTop: '183px',
    marginBottom: '16px',
    fontSize: '17px',
    lineHeight: '21px',
    fontWeight: 'normal',
    textAlign: 'center',
    color: theme.palette.grey.darker,
  },
}));

export default useStyles;
