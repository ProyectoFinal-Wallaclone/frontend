import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { connect, useDispatch } from 'react-redux';
import { getError } from '../store/selectors';
import { authResetState } from '../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function SimpleAlerts({ error }) {

  const dispatch = useDispatch();

  const classes = useStyles();
  const resetError = () => {
    dispatch(authResetState());
  }

  return (
    <div onClick={resetError} className={classes.root}>
      <Alert severity="error">{error}</Alert>

    </div>
  );
}

const mapStateToProps = (state) => ({

  error: getError(state),
});

export default connect(mapStateToProps)(SimpleAlerts)
