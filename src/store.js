import rootReducer from './reducer';
import { createStore } from 'redux';
import noOpMidiDevice from './helpers/noOpMidiDevice';
// import Progression from './models/Progression';
// import Chord from './models/Chord';

const devToolsEnhancer =
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const progression = [
  { key: 0, scale: 'major', mode: 1, chord: 1, notes: { 1: 0, 3: 0, 5: 0 }},
  { key: 0, scale: 'major', mode: 1, chord: 2, notes: { 1: 0, 3: 0, 5: 0 }},
  { key: 0, scale: 'major', mode: 1, chord: 3, notes: { 1: 0, 3: 0, 5: 0 }},
  { key: 0, scale: 'major', mode: 1, chord: 4, notes: { 1: 0, 3: 0, 5: 0 }},
  { key: 0, scale: 'major', mode: 1, chord: 5, notes: { 1: 0, 3: 0, 5: 0 }},
  { key: 0, scale: 'major', mode: 1, chord: 6, notes: { 1: 0, 3: 0, 5: 0 }},
  { key: 0, scale: 'major', mode: 1, chord: 7, notes: { 1: 0, 3: 0, 5: 0 }},
];

const initialState = {
  webMidiEnabled: false,
  devices: {
    midiDevice: noOpMidiDevice,
    dawListener: noOpMidiDevice,
    outputDevice: noOpMidiDevice,
  },
  progression
  // progression: new Progression().unwrap()
};

export default createStore(
  rootReducer,
  initialState,
  devToolsEnhancer
);
