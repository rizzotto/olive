import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  infos: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& span': {
      margin: '0px 10px',
    },
  },
  inputs: {
    width: '60px',
  },
}));

export default useStyles;
