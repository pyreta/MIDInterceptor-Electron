import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  ADD_KEY_PRESS,
  REMOVE_KEY_PRESS,
} = actionTypes;

export default handleActions(
  {
    [ADD_KEY_PRESS]: (state, { payload }) => ({ ...state, [payload]: true }),
    [REMOVE_KEY_PRESS]: (state, { payload }) => ({ ...state, [payload]: false }),
  },
  0
);
