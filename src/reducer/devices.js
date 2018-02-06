import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  LOAD_MIDI_DEVICES,
} = actionTypes;

export default handleActions(
  {
    [LOAD_MIDI_DEVICES]: (state, { payload }) => payload
  },
  {}
);
