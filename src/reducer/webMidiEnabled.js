import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  ENABLE_WEB_MIDI,
} = actionTypes;

export default handleActions(
  {
    [ENABLE_WEB_MIDI]: () => true
  },
  false
);
