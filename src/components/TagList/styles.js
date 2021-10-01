import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    margin: '10px -20px',
    padding: '0 20px',

    justifyContent: props => !props.horizontal && 'flex-start',
    flexWrap: props => !props.horizontal && 'wrap',
    overflowX: props => props.horizontal && 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

export default useStyles;
