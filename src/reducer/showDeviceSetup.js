import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  TOGGLE_DEVICE_SETUP,
} = actionTypes;

export default handleActions(
  {
    [TOGGLE_DEVICE_SETUP]: state => !state,
  },
  true
);
