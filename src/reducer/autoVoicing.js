import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  TOGGLE_AUTO_VOICING,
} = actionTypes;

export default handleActions(
  {
    [TOGGLE_AUTO_VOICING]: autoVoicing => !autoVoicing,
  },
  false
);
