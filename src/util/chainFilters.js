
//TODO make other keys accurate, right now note letters dont remain accurate
const changeNoteNumber = (e, difference) => ({
    ...e,
    note: {
      ...e.note,
      number: e.note.number + difference
    }
  });

export const passThrough = eventObject =>
  Object.values(eventObject).reduce((accum, e) => ({
    ...accum,
    [e.note.number]: e,
  }), {});

export const octaveDown = eventObject =>
  Object.values(eventObject).reduce((accum, e) => (
    { ...accum, [e.note.number-12]: changeNoteNumber(e, -12) }
  ), {});

export const minorChord = eventObject =>
  Object.values(eventObject).reduce((accum, e) => ({
    ...accum,
    [e.note.number]: e,
    [e.note.number + 3]: changeNoteNumber(e, 3),
    [e.note.number + 7]: changeNoteNumber(e, 7)
  }), {});

export const tripleOctave = eventObject =>
  Object.values(eventObject).reduce((accum, e) => ({
    ...accum,
    [e.note.number - 12]: changeNoteNumber(e, -12),
    [e.note.number]: e,
    [e.note.number + 12]: changeNoteNumber(e, 12),
  }), {});
