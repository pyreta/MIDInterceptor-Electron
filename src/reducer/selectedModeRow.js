import { handleActions } from 'redux-actions';
import { actionTypes } from '../actions';

const {
  SELECT_MODE_ROW,
} = actionTypes;

export default handleActions(
  {
    [SELECT_MODE_ROW]: (state, { payload }) => payload,
  },
  0
);
