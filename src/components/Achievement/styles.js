import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.palette.grey.main,
    borderRadius: 12,
    display: 'flex',
    height: 81,
    justifyContent: 'flex-start',
    padding: 10,
    width: '100%',
  },
  content: {
    width: '100%',
    paddingLeft: 10,
    textAlign: 'left',
  },
  title: {
    color: props => (props.disabled ? theme.palette.grey.darker : '#000'),
    fontWeight: 500,
    paddingBottom: 5,
  },
}));

export default useStyles;
