import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    width: '85%',
  },
  sliderLabel: {
    width: '10%',
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.typography.color,
  },
}));

export default useStyles;
