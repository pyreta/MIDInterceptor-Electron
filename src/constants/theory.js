export const intervalTypes = [
  { 0: 'root' },
  { 2: 'minor' },
  { 2: 'major' },
  { 3: 'minor' },
  { 3: 'major' },
  { 4: 'perfect' },
  { 5: 'flat', 4: 'sharp' },
  { 5: 'perfect' },
  { 5: 'sharp' },
  { 7: 'diminished', 6: 'major' },
  { 7: 'minor' },
  { 7: 'major' },
  { 8: 'octave' },
  { 9: 'flat' },
  { 9: 'perfect' },
  { 9: 'sharp' },
  { 11: 'flat' },
  { 11: 'perfect' },
  { 11: 'sharp' },
  { 5: 'perfectOctave' },
  { 13: 'flat' },
  { 13: 'perfect' },
  { 13: 'sharp' },
];

let idx = 0
export const intervals = intervalTypes.reduce((ints, intervalObject) => {
  const namesForThisInterval = Object.keys(intervalObject).reduce((smallInts, intKey) => {
    const key = `${intervalObject[intKey]}${intKey}`;
    return { ...smallInts, [key]: idx };
  }, {})
  idx++;
  return { ...ints, ...namesForThisInterval };
}, {})

export const romanNumerals = ['i','ii', 'iii', 'iv', 'v', 'vi', 'vii']
export const notes = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

export const scales = {
  major: {
    name: 'Major',
    intervals: [2, 2, 1, 2, 2, 2, 1],
    modes: [
      'Major (Ionian)',
      'Dorian',
      'Phrygian',
      'Lydian',
      'Mixolydian',
      'Minor (Aeolian)',
      'Locrian'
    ],
  },
  minor: {
    name: 'Minor',
    intervals: [2, 1, 2, 2, 1, 2, 2],
    modes: [
      'Minor (Aeolian)',
      'Locrian',
      'Major (Ionian)',
      'Dorian',
      'Phrygian',
      'Lydian',
      'Mixolydian',
    ],
  },
  harmonicMinor: {
    name: 'Harmonic Minor',
    intervals: [2, 1, 2, 2, 1, 3, 1],
    modes: [
      'Harmonic Minor',
      'Locrian #6',
      'Ionian Augmented',
      'Dorian #4',
      'Phrygian Dominant',
      'Lydian #2',
      'Superlocrian'
    ],
  },
  melodicMinor: {
    name: 'Melodic Minor',
    intervals: [2, 1, 2, 2, 2, 2, 1],
    modes: [
      'Melodic Minor',
      'Dorian b9',
      'Lydian Augmented',
      'Lydian Dominant',
      'Mixolydian b6',
      'Semilocrian',
      'Altered Scale'
    ],
  },
  harmonicMajor: {
    name: 'Harmonic Major',
    intervals: [2, 2, 1, 2, 1, 2, 1],
    modes: [
      'Harmonic Major',
      'Dorian b5',
      'Phrygian b4',
      'Lydian b3',
      'Mixolydian b9',
      'Aeolian b1',
      'Locrian b7'
    ],
  },
};
