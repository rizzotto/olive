import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 50,
    height: props => (props.achievement ? 8 : 15),
  },

  colorPrimary: {
    backgroundColor: props => props.disabled && theme.palette.grey.medium,
  },
  barColorPrimary: {
    backgroundColor: props => props.disabled && theme.palette.grey.darker,
  },
}));

export default useStyles;
