import { NOTES } from './constants';
const isString = x => typeof x === 'string';
export const shift = (arr, n) => [...arr.slice(n), ...arr.slice(0, n)];
export const getNoteNum = (root = 0) => {
  if (isString(root)) {
    return NOTES.indexOf(root.toUpperCase());
  } else {
    return root;
  }
};
