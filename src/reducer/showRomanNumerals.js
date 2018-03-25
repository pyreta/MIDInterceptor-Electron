import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  TOGGLE_ROMAN_NUMERALS,
} = actionTypes;

export default handleActions(
  {
    [TOGGLE_ROMAN_NUMERALS]: state => !state,
  },
  true
);
