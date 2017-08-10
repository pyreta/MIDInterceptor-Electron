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

// export const semitones = [
//   'root',
//   'flat_second',
//   'second',
//   'min_third',
//   'maj_third',
//   'fourth',
//   'flat_fifth',
//   'fifth',
//   'sharp_fifth',
//   'maj_six',
//   'min_seven',
//   'maj_seven',
//   'upper_octave',
//   'flat_nine',
//   'nine',
//   'sharp_nine',
//   'flat_eleven',
//   'eleven',
//   'sharp_eleven',
//   'fifth_octave_up',
//   'sharp_fifth_octave_up',
//   'thirteen',
//   'min_seven_up',
//   'maj_seven_up',
//   'second_octave_up'
// ];
//
// export const parent_scales = {
//   Major: [
//     'Ionian',
//     'Dorian',
//     'Phrygian',
//     'Lydian',
//     'Mixolydian',
//     'Aeolian',
//     'Locrian'
//   ],
//   'Harmonic Minor': [
//     'Harmonic Minor',
//     'Locrian #6',
//     'Ionian #5',
//     'Dorian #4',
//     'Phrygian Dominant',
//     'Lydian #2',
//     'Alt Dominant bb7'
//   ],
//   'Melodic Minor': [
//     'Melodic Minor',
//     'Dorian b9',
//     'Lydian Augmented',
//     'Lydian Dominant',
//     'Mixolydian b6',
//     'Semilocrian',
//     'Superlocrian'
//   ],
//   'Harmonic Major': [
//     'Harmonic Major',
//     'Dorian b5',
//     'Phrygian b4',
//     'Lydian b3',
//     'Mixolydian b9',
//     'Aeolian b1',
//     'Locrian b7'
//   ]
// };

// interval_list = [
//   self.self,
//   self.flat_second,
//   self.second,
//   self.minor_third,
//   self.major_third,
//   self.fourth,
//   self.flatted_fifth,
//   self.fifth,
//   self.sharp_fifth,
//   self.major_sixth,
//   self.minor_seventh,
//   self.major_seventh,
//   self.upper_octave,
//   self.flatted_ninth,
//   self.ninth,
//   self.raised_ninth,
//   self.flatted_eleventh,
//   self.eleventh,
//   self.sharp_eleventh,
//   self.fifth_octave_up,
//   self.sharp_fifth_octave_up,
//   self.thirteenth,
//   self.minor_seventh_octave_up,
//   self.major_seventh_octave_up,
//   self.second_octave_up
// ];
//
// self.major_scale = [
//   self.self,
//   self.second,
//   self.major_third,
//   self.fourth,
//   self.fifth,
//   self.major_sixth,
//   self.major_seventh
// ];
// self.minor_scale = [
//   self.self,
//   self.second,
//   self.minor_third,
//   self.fourth,
//   self.fifth,
//   self.minor_sixth,
//   self.minor_seventh
// ];
// // [0, 2, 4, 6, 8, 9, 11]
// self.harmonic_minor_scale = [
//   self.self,
//   self.second,
//   self.minor_third,
//   self.fourth,
//   self.fifth,
//   self.minor_sixth,
//   self.major_seventh
// ];
// self.melodic_minor_scale = [
//   self.self,
//   self.second,
//   self.minor_third,
//   self.fourth,
//   self.fifth,
//   self.major_sixth,
//   self.major_seventh
// ];
// self.harmonic_major_scale = [
//   self.self,
//   self.second,
//   self.major_third,
//   self.fourth,
//   self.fifth,
//   self.minor_sixth,
//   self.major_seventh
// ];
//
// self.self = note
// 		self.flat_second = note+1
// 		self.second = note+2
// 		self.minor_third = note+3
// 		self.major_third = note+4
// 		self.fourth = note+5
// 		self.flatted_fifth = note+6
// 		self.fifth = note+7
// 		self.sharp_fifth = note+8
// 		self.minor_sixth = note+8
// 		self.major_sixth = note+9
// 		self.diminished_seventh = note+9
// 		self.minor_seventh = note+10
// 		self.major_seventh = note+11
// 		self.upper_octave = note+12
// 		self.flatted_ninth = note+13
// 		self.ninth = note+14
// 		self.raised_ninth = note+15
// 		self.flatted_eleventh = note+16
// 		self.eleventh = note+17
// 		self.sharp_eleventh = note+18
// 		self.fifth_octave_up = note+19
// 		self.sharp_fifth_octave_up = note+20
// 		self.thirteenth = note+21
// 		self.minor_seventh_octave_up = note+22
// 		self.major_seventh_octave_up = note+23
// 		self.second_octave_up = note+24

export const mapMajor = {
  to: {
    ionian: {},
    aeolian: { 4: 3, 9: 8, 11: 10 },
    phrygian: { 2: 1, 4: 3, 9: 8, 11: 10 },
    mixolydian: { 11: 10 },
    dorian: { 4: 3, 11: 10 },
    harmonicMinor: { 4: 3 },
  }
}

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
