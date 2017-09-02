
export const mapMajor = {
  to: {
    ionian: {},
    dorian: { 4: 3, 11: 10 },
    phrygian: { 2: 1, 4: 3, 9: 8, 11: 10 },
    lydian: { 5: 6 },
    mixolydian: { 11: 10 },
    aeolian: { 4: 3, 9: 8, 11: 10 },
    locrian: { 2: 1, 4: 3, 7: 6, 9: 8, 11: 10 },
    harmonicMinor: { 4: 3 },
    locrianSharp6: { 2: 1, 4: 3, 7: 6, 11: 10 },
    phrygianDominant: { 2: 1, 9: 8, 11: 10 },
    ionianSharp5: { 7: 8 },
  }
}

const majorModes = [
  'Ionian',
  'Dorian',
  'Phrygian',
  'Lydian',
  'Mixolydian',
  'Aeolian',
  'Locrian'
];

const harmonicMinorModes = [
  'Harmonic Minor',
  'Locrian #6',
  'Ionian #5',
  'Dorian #4',
  'Phrygian Dominant',
  'Lydian #2',
  'Alt Dominant bb7'
];

const harmonicMajorModes = [
  'Harmonic Major',
  'Dorian b5',
  'Phrygian b4',
  'Lydian b3',
  'Mixolydian b9',
  'Aeolian b1',
  'Locrian b7'
];

const melodicMinorModes = [
  'Melodic Minor',
  'Dorian b9',
  'Lydian Augmented',
  'Lydian Dominant',
  'Mixolydian b6',
  'Semilocrian',
  'Superlocrian'
];

const scales = {
  major: {
    modes: majorModes,
    intervals: [0, 2, 4, 5, 7, 9, 11]
  },
  harmonicMinor: {
    modes: harmonicMinorModes,
    intervals: [0, 2, 3, 5, 7, 9, 11]
  },
  harmonicMajor: {
    modes: harmonicMajorModes
  },
  melodicMinor: {
    modes: melodicMinorModes
  }
};

export default scales;
