import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  SET_MODE_INDEX,
} = actionTypes;

export default handleActions(
  {
    [SET_MODE_INDEX]: (state, { payload }) => payload,
  },
  0
);
