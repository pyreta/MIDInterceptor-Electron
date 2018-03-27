import { combineReducers } from 'redux';
import progression from './progression';
import voicingDecorator from './voicingDecorator';
import devices from './devices';
import webMidiEnabled from './webMidiEnabled';
import tonic from './tonic';
import autoVoicing from './autoVoicing';
import selectedModeRow from './selectedModeRow';
import modeRowIndex from './modeRowIndex';
import keysPressed from './keysPressed';
import modeRows from './modeRows';
import lastPlayedChord from './lastPlayedChord';
import showRomanNumerals from './showRomanNumerals';
import showNotesInCommon from './showNotesInCommon';
import showScales from './showScales';
import showDeviceSetup from './showDeviceSetup';

export default combineReducers({
  lastPlayedChord,
  showRomanNumerals,
  showDeviceSetup,
  showScales,
  showNotesInCommon,
  modeRows,
  keysPressed,
  modeRowIndex,
  autoVoicing,
  selectedModeRow,
  tonic,
  chordBody: (state = {}, action) => {
    if (action.type === 'UPDATE_CHORD_BODY') return action.payload
    return state;
  },
  webMidiEnabled,
  devices,
  voicingDecorator,
  progression,
});;
