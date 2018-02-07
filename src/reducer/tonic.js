import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  CHANGE_KEY,
} = actionTypes;

export default handleActions(
  {
    [CHANGE_KEY]: (state, { payload }) => payload
  },
  0
);
