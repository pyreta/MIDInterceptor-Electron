import Progression from './models/Progression';
import { handleActions } from 'redux-actions';

export default handleActions({
  CHANGE_KEY: (state, action) => ({
    progression: new Progression(state.progression)
      .setKey(parseInt(action.payload, 10))
      .unwrap()
  }),
  CHANGE_SCALE: (state, action) => ({
    progression: new Progression(state.progression)
      .setScale(action.payload)
      .unwrap()
  }),
  CHANGE_MODE: (state, action) => ({
    progression: new Progression(state.progression)
      .setMode(parseInt(action.payload, 10))
      .unwrap()
  }),
  ADJUST_CHORD: (state, action) => {
    const { interval, value, on, idx } = action.payload;
    const i = parseInt(idx, 10);
    const chord = new Progression(state.progression).at(i);
    const newChord = on ?
      chord.addNote(interval, value) :
      chord.removeNote(interval)
    return {
      progression: new Progression(state.progression)
        .setChordAt(i, newChord.unwrap())
        .unwrap(),
    }
  },
}, {})
