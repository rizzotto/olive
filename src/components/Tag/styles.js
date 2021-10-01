import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    border: props =>
      `1px solid ${
        props.disabled
          ? theme.palette.grey.medium
          : theme.palette.secondary.main
      }`,
    borderRadius: 21,
    padding: '6px 10px',
    background: 'none',
    color: props =>
      props.selected
        ? 'white'
        : props.disabled
        ? 'gray'
        : theme.palette.secondary.main,
    font: 'inherit',
    cursor: props => (props.isButton ? 'pointer' : 'inherit'),
    outline: 'inherit',
    backgroundColor: props =>
      props.selected ? theme.palette.secondary.main : 'transparent',
    transition: '0.3s',

    '&:active': {
      backgroundColor: props => props.isButton && theme.palette.secondary.main,
    },
  },
}));

export default useStyles;
