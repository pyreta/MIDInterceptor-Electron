import { notes } from '../../constants';
import { mapMajor } from '../../constants/scales';

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

export const whiteKeysToScale = (eventObject, { mode = 'ionian', currentKey = 'C' }) =>
  Object.values(eventObject).reduce((accum, e) => {
    const octaveAdder = Math.floor(e.note.number/12) * 12;
    const transposeAdder = notes.indexOf(currentKey);
    const noteIdx = e.note.number % 12;
    const newNumber = (mapMajor.to[mode][noteIdx] || noteIdx) + octaveAdder + transposeAdder;
    return { ...accum, [newNumber]: changeNoteNumber(e, e.note.number - newNumber) };
  }, {});


export const logNotes = eventObject => {
  console.log(eventObject);
  return eventObject
}
