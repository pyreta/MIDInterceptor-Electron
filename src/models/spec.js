//eslint-ignore

// Scale
const scale = Scale.major('C')
const scale = Scale.major(3)
const scaleNoteValues = scale.noteValues() // [0, 2, 4, 5, 7, 9, 11]
const scaleNotes = scale.notes() // [C, D, E, F, G, A, B]

// Mode
const secondMode = scale.getMode(2); // Mode Class of C Dorian
const secondModeNoteValues = secondMode.noteValues() // [0, 2, 3, 5, 7, 9, 10] or whatever
const secondModeNotes = secondMode.notes() // [D, E, F, G, A, B, C]
const secondModeName = secondMode.name(); // Dorian

// Chord
const thirdDorianChord = secondMode.getChord(3); // Chord Class whatever chord 3 is of C Dorian
