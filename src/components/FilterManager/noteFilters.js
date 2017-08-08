import { notes } from '../../constants';

  const changeNoteNumber = (e, difference) =>
    [e.note.number - difference]
      .map(number => ({
        ...e,
        note: {
          number,
          name: notes[number % 12]
        }
      }))[0]

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

export const minorSeventhChord = eventObject =>
  Object.values(eventObject).reduce((accum, e) => ({
    ...accum,
    [e.note.number]: e,
    [e.note.number + 3]: changeNoteNumber(e, 3),
    [e.note.number + 7]: changeNoteNumber(e, 7),
    [e.note.number + 10]: changeNoteNumber(e, 10),
    [e.note.number + 15]: changeNoteNumber(e, 15)
  }), {});

export const tripleOctave = eventObject =>
  Object.values(eventObject).reduce((accum, e) => ({
    ...accum,
    [e.note.number - 12]: changeNoteNumber(e, -12),
    [e.note.number]: e,
    [e.note.number + 12]: changeNoteNumber(e, 12),
  }), {});

export const translateScale = (eventObject, scale = 'phrygianDominant', key = 'C') => {
  console.log('no op just yet');
  return eventObject
}

export const logNotes = eventObject => {
  console.log(eventObject);
  return eventObject
}
