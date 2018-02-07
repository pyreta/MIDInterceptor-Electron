import { combineReducers } from 'redux';
import progression from './progression';
import devices from './devices';
import webMidiEnabled from './webMidiEnabled';
import tonic from './tonic';
import keysPressed from './keysPressed';

export default combineReducers({
  keysPressed,
  tonic,
  chordBody: (state = {}, action) => {
    if (action.type === 'UPDATE_CHORD_BODY') return action.payload
    return state;
  },
  webMidiEnabled,
  devices,
  progression,
});;
