import { combineReducers } from 'redux';
import progression from './progression';
import devices from './devices';
import webMidiEnabled from './webMidiEnabled';
import tonic from './tonic';
import autoVoicing from './autoVoicing';
import keysPressed from './keysPressed';
import modeRows from './modeRows';
import lastPlayedChord from './lastPlayedChord';

export default combineReducers({
  lastPlayedChord,
  modeRows,
  keysPressed,
  autoVoicing,
  tonic,
  chordBody: (state = {}, action) => {
    if (action.type === 'UPDATE_CHORD_BODY') return action.payload
    return state;
  },
  webMidiEnabled,
  devices,
  progression,
});;
