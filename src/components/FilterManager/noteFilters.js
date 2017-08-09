import { notes, mapMajor } from '../../constants';

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

// export const translateScale = (eventObject, scale = 'harmonicMinor', key = 'C') =>
//   Object.values(eventObject).reduce((accum, e) => {
//     const baseOctave = Math.floor(e.note.number/12)*12;
//     const map = { 0: 0, 2:2, 4:3, 5: 5, 7: 7, 9: 9, 11: 10 };
//     // const map = {0: 0, 2:2, 4:3, 5: 5, 7: 7, 9: 9, 11: 11};
//     const newNumber = map[e.note.number % 12]+baseOctave;
//     return {
//     ...accum,
//     // [e.note.number]: e,
//     [newNumber]: changeNoteNumber(e, e.note.number - newNumber),
//   }}, {});

export const translateScale = (eventObject, scale = 'harmonicMinor', key = 'C') =>
  Object.values(eventObject).reduce((accum, e) => {
    const octaveAdder = Math.floor(e.note.number/12) * 12;
    const noteIdx = e.note.number % 12;
    const newNumber = (mapMajor.to[scale][noteIdx] || noteIdx) + octaveAdder;
    return { ...accum, [newNumber]: changeNoteNumber(e, e.note.number - newNumber) };
  }, {});


export const logNotes = eventObject => {
  console.log(eventObject);
  return eventObject
}
