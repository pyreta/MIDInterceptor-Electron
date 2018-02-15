import _ from 'lodash';
// import { NOTES } from './constants';
import { notes } from '../constants/theory';

// const isString = x => typeof x === 'string';
// export const shift = (arr, n) => [...arr.slice(n), ...arr.slice(0, n)];
// export const getNoteNum = (root = 0) => {
//   if (isString(root)) {
//     return NOTES.indexOf(root.toUpperCase());
//   } else {
//     return root;
//   }
// };

const ascending = (a, b) => a - b;

export const getVoicing = (chord, { withRoot } = {}) => {
  const voicing = chord.get('voicing');
  const noteValues = chord.noteValues();
  const voicedValues =
    _.flatten(
      Object.keys(voicing)
        .sort(ascending)
        .map((voicingIdx, idx) => {
          const noteValue = noteValues[idx];
          const noteVoicings = voicing[voicingIdx];
          return noteVoicings.map(singleVoicing => {
            const octaveAdjustment =
              chord.chord.octave * 12 + singleVoicing * 12;
            return noteValue + octaveAdjustment;
          });
        }),
    ).sort(ascending);
    const adjustedVoiceValues = withRoot ? [chord.root().value() + (12 * withRoot), ...voicedValues] : voicedValues
  return {
    noteNames: () => adjustedVoiceValues.map(n => notes[n % 12]),
    noteValues: () => adjustedVoiceValues,
  };
}

export const setVoicing = (chord, voice) => {
  const noteValues = chord.noteValues();
  const moddedNotes = noteValues.map(x => x % 12);
  const intervals = Object.keys(chord.get('notes'))
  const newVoice = intervals.reduce((acc, n) => {
    return {...acc, [n]: []}
  }, {});
  voice.forEach((note, idx) => {
    const val = note % 12;
    const valIdx = moddedNotes.indexOf(val);
    const interval = intervals[valIdx];
    const unvoicedNote = noteValues[valIdx]
    let octavesBelow = 0;
    const amountBelowOctave = (chord.get('octave') * 12) - note;
    const octave = Math.floor((val - unvoicedNote) / 12);
    if (amountBelowOctave > 0) {
      octavesBelow = 1
      // TODO fix chord and notes under octave are ringing out
      // octavesBelow = Math.round(amountBelowOctave/12) + 1
    }
    newVoice[interval].push(octave - octavesBelow)
  })
  chord.chord.voicing = newVoice;
}

export const matchChordVoicings = (chord, otherChord) => {
  const newVoice = [];
  const lastVoicing = otherChord.voicing().noteValues();

  chord.noteValues().forEach(closestNote => {

    let winner = { smallestDistance: 1000 };
    while (closestNote <= lastVoicing[lastVoicing.length - 1] + 12) {
      const distancesFromVoicing = chord.findDistance(lastVoicing, closestNote);
      const smallestDistance = _.min(distancesFromVoicing);
      const smallestIdx = distancesFromVoicing.indexOf(smallestDistance);

      if (smallestDistance < winner.smallestDistance) {
        winner = { smallestIdx, smallestDistance, closestNote };
      }
      _.min()
      closestNote += 12;
    }
    newVoice.push(winner.closestNote);
  })

  const c = chord.clone();
  setVoicing(c,newVoice.sort(ascending))
  return c;
}
