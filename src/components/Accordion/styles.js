import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#fafafa',
    boxShadow: 'none',
  },
  title: {
    fontSize: '20px',
    fontWeight: 500,
  },
  description: {
    marginTop: '-10px',
    marginLeft: '18px',
    lineHeight: '20px',
    fontSize: '17px',
  },
}));

export default useStyles;
