import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  userContainer: {
    display: 'block',
  },
  user: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    height: '100%',
    maxHeight: 93,
  },
  h3: {
    color: '#212121',
    fontWeight: 400,
    marginRight: 6,
    maxWidth: 131,
  },
  sticky: {
    position: 'sticky',
    top: '-20px',
    zIndex: 1000,
    backgroundColor: '#fafafa',
    paddingBottom: '5px',
  },
}));

export default useStyles;
