import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  TOGGLE_SCALES,
  TOGGLE_ROMAN_NUMERALS,
  TOGGLE_NOTES_IN_COMMON,
  TOGGLE_DEVICE_SETUP,
} = actionTypes;

export default handleActions(
  {
    [TOGGLE_SCALES]: settings => ({
      ...settings,
      showScales: !settings.showScales
    }),
    [TOGGLE_ROMAN_NUMERALS]: settings => ({
      ...settings,
      showRomanNumerals: !settings.showRomanNumerals
    }),
    [TOGGLE_NOTES_IN_COMMON]: settings => ({
      ...settings,
      showNotesInCommon: !settings.showNotesInCommon
    }),
    [TOGGLE_DEVICE_SETUP]: settings => ({
      ...settings,
      showDeviceSetup: !settings.showDeviceSetup
    }),
  },
  true
);
