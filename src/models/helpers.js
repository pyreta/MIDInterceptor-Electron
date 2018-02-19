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
              chord.get('octave') * 12 + singleVoicing * 12;
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

export const convertNotesToVoicing = (chord, voice) => {
  const noteValues = chord.noteValues();
  const moddedNotes = noteValues.map(x => x % 12);
  const intervals = Object.keys(chord.get('notes'))
  const newVoice = intervals.reduce((acc, n) => {
    return {...acc, [n]: []}
  }, {});

  const intervalsInOrder = voice.map((note, idx) => {
    const val = note % 12;
    const valIdx = moddedNotes.indexOf(val);
    return intervals[valIdx];
  });
  const voiceOctaveRemoved = voice.map(n => n - (12 * chord.get('octave')) - chord.root().value())
  const octavesRepresented = voiceOctaveRemoved.map(n => Math.floor(n/12))
  intervalsInOrder.forEach((interval, idx) => {
    newVoice[interval].push(octavesRepresented[idx])
  })
  return newVoice;
}

export const rotateVoice = (voicing, times) => {
  if (times === 0) return voicing;
  let [first, last] = [voicing[0], voicing[voicing.length - 1]];
  while (first <= last) first += 12;
  return rotateVoice([...voicing.slice(1), first], times - 1);
};

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

  return chord.clone({ voicing: convertNotesToVoicing(chord, newVoice)});
}
