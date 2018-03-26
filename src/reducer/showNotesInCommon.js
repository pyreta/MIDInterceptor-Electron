import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  TOGGLE_NOTES_IN_COMMON,
} = actionTypes;

export default handleActions(
  {
    [TOGGLE_NOTES_IN_COMMON]: state => !state,
  },
  true
);
