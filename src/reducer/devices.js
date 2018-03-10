import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  LOAD_MIDI_DEVICES,
  SET_MIDI_DEVICE,
} = actionTypes;

export default handleActions(
  {
    [LOAD_MIDI_DEVICES]: (devices, { payload }) => payload,
    [SET_MIDI_DEVICE]: (devices, { payload: newDevice }) => ({ ...devices, ...newDevice })
  },
  {}
);
