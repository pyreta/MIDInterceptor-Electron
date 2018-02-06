import Progression from '../models/Progression';
import { handleActions } from 'redux-actions';

const update = (progression, action) =>
  Progression.wrap(progression)
    .setKey(parseInt(action.payload, 10))
    .unwrap();

export default handleActions(
  {
    CHANGE_SCALE: (progression, action) =>
      Progression.wrap(progression)
        .setScale(action.payload)
        .unwrap(),
    CHANGE_KEY: update,
    CHANGE_MODE: update,
    ADJUST_CHORD: (progression, action) => {
      const { interval, value, on, idx } = action.payload;
      const i = parseInt(idx, 10);
      const chord = Progression.wrap(progression).at(i);
      const newChord = on
        ? chord.addNote(interval, value)
        : chord.removeNote(interval);
      return Progression.wrap(progression)
        .setChordAt(i, newChord.unwrap())
        .unwrap();
    },
  },
  {},
);
