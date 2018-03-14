import { scales } from '../constants/theory';
const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11, 12];

const mapScale = (note, { key = 0, scale = 'major', mode = 1 }) => {
  const scaleIntervals = scales[scale].intervals;
  const sliceIdx = mode % 12 - 1;
  const left = scaleIntervals.slice(0, sliceIdx);
  const right = scaleIntervals.slice(sliceIdx);
  const modeIntervals = [...right, ...left];
  const scaleDegree = majorScaleIntervals.indexOf(note % 12);
  const rootNote = note - majorScaleIntervals[scaleDegree];
  const modeDegrees = modeIntervals.reduce(
    (acc, n) => [...acc, acc[acc.length - 1] + n],
    [rootNote],
  );
  return modeDegrees[scaleDegree] + key;
};

export default mapScale;
