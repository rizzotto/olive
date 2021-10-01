import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: 'auto',
    width: '100%',
    borderTop: `2px solid ${theme.palette.secondary.main}`,
    '& .MuiBottomNavigationAction-label': {
      fontWeight: 'bold',
      fontSize: 10,
    },
  },
}));

export default useStyles;
