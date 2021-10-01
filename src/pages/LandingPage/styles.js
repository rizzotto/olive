import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      overflowX: 'hidden',
    },
  },
  container: {
    height: '100vh',
  },
  rectangle: {
    position: 'absolute',
    zIndex: '-1',
  },
  page1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 100,
    height: '100%',
    maxHeight: 751,
  },
  titleContainer: {
    paddingRight: 200,
    paddingBottom: 100,
  },
  title: {
    fontSize: 60,
    color: theme.palette.base.primary,
    fontWeight: 'bold',
  },
  title2: {
    textAlign: 'center',
    color: theme.palette.secondary.main,
    fontSize: 40,
    marginBottom: 50,
  },
  subtitle: {
    fontSize: 20,
    color: theme.palette.base.primary,
  },
  page2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 190,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 350,
  },
  h2: {
    textAlign: 'center',
    marginTop: 50,
  },
  span: {
    textAlign: 'center',
    color: '#8A8A8E',
    fontSize: 20,
  },
  carousel: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'space-evenly',
    padding: 40,
  },
  carouselTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    width: '100%',
    color: theme.palette.base.primary,
    maxWidth: 550,
  },
  footer: {
    marginTop: 240,
    backgroundColor: theme.palette.primary.main,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: theme.palette.base.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerTitle: {
    marginTop: 24,
  },
}));

export default useStyles;
