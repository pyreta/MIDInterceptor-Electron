import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  PLAY_CHORD,
} = actionTypes;

export default handleActions(
  {
    [PLAY_CHORD]: (state, { payload }) => payload
  },
  0
);
