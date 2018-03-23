import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  LOAD_CHORDS,
} = actionTypes;

export default handleActions(
  {
    [LOAD_CHORDS]: (state, { payload }) => payload,
  },
  [[]]
);
