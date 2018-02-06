import { combineReducers } from 'redux';
import progression from './progression';
import devices from './devices';
import webMidiEnabled from './webMidiEnabled';

export default combineReducers({
  webMidiEnabled,
  devices,
  progression,
});;
