import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  TOGGLE_SCALES,
} = actionTypes;

export default handleActions(
  {
    [TOGGLE_SCALES]: state => !state,
  },
  true
);
