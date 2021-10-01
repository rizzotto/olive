import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  container: {
    textAlign: 'center',
  },
  crop: {
    borderRadius: 20,
  },
  image: {
    position: 'relative',
    marginTop: '10px',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheet: {
    textAlign: 'center',
  },
  overlayLeft: {
    width: '50%',
    left: 0,
    height: '98%',

    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayRight: {
    width: '50%',
    height: '98%',
    right: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayCenter: {
    width: '100%',
    height: '96%',
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    borderRadius: 20,
    width: '100%',
    height: '100%',
  },
  icon: {
    fontSize: 40,
    color: theme.palette.background.paper,
  },
  buttonImage: {
    marginTop: '10px',
    textTransform: 'none',
    borderRadius: 10,
    height: '45px',
  },
}));

export default useStyles;
