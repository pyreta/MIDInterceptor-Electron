import { notes } from '../../constants';
import { mapMajor } from '../../constants/scales';

  const changeNoteNumber = (e, difference) =>
    [e.note.number + difference]
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

const transposedEventObject = (noteIdxs, mode, currentKey, e) => {
  const octaveAdder = Math.floor(e.note.number/12) * 12;
  const transposeAdder = notes.indexOf(currentKey);
  return noteIdxs.reduce((accum, noteIdx) => {
    const newNumber = (mapMajor.to[mode][noteIdx] || noteIdx) + octaveAdder + transposeAdder;
    return { ...accum, [newNumber]: changeNoteNumber(e, newNumber - e.note.number) };
  }, {})
}

export const whiteKeysToScale = (eventObject, { mode = 'ionian', currentKey = 'C' }) =>
  Object.values(eventObject).reduce((accum, e) => {
    const noteIdx = e.note.number % 12;
    return { ...accum, ...transposedEventObject([noteIdx], mode, currentKey, e) };
  }, {});


const majorIntervals = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24];
const getMajorChord = (noteIdx, interval = 1) => {
  const startIdx = majorIntervals.indexOf(noteIdx);
  return majorIntervals.slice(startIdx).filter((el, idx) => (idx + 2) % 2 === 0).slice(0, 4)
    .map((el, idx) => idx < interval ? el + 12 : el);
}

export const whiteKeysToChords = (eventObject, { mode = 'ionian', currentKey = 'C' }) =>
  Object.values(eventObject).reduce((accum, e) => {
    const noteIdx = e.note.number % 12;
    const majorChord = transposedEventObject(getMajorChord(noteIdx), 'ionian', 'C', e);
    return {...accum, ...whiteKeysToScale(majorChord, { mode, currentKey })};
  }, {});


export const logNotes = eventObject => {
  console.log(eventObject);
  return eventObject
}
