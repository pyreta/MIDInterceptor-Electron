import _ from 'lodash';
import Chord from './Chord';

export default class Progression {
  static wrap(...args) {
    return new Progression(...args);
  }
  static allChords(args = {}) {
    const { key, scale, mode, notes } = { key: 0, scale: 'major', mode: 1, notes: { 1: 0, 3: 0, 5: 0 }, ...args };
    return new Progression([1,2,3,4,5,6,7].map(chord => ({ key, scale, mode, chord, notes })))
  }

  constructor(progression) {
    this.progression = progression || [new Chord().unwrap()];
  }

  replace(chordNumber, fn = c => [c]) {
    const left = this.progression.slice(0, chordNumber-1);
    const right = this.progression.slice(chordNumber);
    return new Progression([
      ...left,
      ..._.flatten([fn(this.getChord(chordNumber))]).map(c => c.unwrap()),
      ...right,
    ])
  }

  unwrap() {
    return this.progression;
  }

  at(idx) {
    return Chord.wrap(this.progression[idx], this);
  }

  getChord(chordNumber) {
    return this.at(chordNumber - 1);
  }

  setChordAt(i, c) {
    const newP = [...this.progression];
    newP[i] = c;
    return new Progression(newP)
  }

  last() {
    return this.at(this.progression.length - 1);
  }

  first() {
    return this.at(0);
  }

  chords() {
    return this.progression.map(c => Chord.wrap(c, this));
  }

  chordNumber(n) {
    return this.at(n - 1);
  }

  swap(chordA, chordB) {
    const newProgression = [...this.progression];
    newProgression[chordB - 1] = this.progression[chordA - 1];
    newProgression[chordA - 1] = this.progression[chordB - 1];
    return new Progression(newProgression);
  }

  transport(from, to) {
    const newProgression = [...this.progression];
    const pluckedChord = _.pullAt(newProgression, from - 1);
    newProgression[to - 1] = pluckedChord[0];
    return new Progression(newProgression);
  }

  setAllAttrs(attr, value) {
    return new Progression(
      this.progression.map(chord => ({ ...chord, [attr]: value })),
    );
  }

  setKey(key) {
    return this.setAllAttrs('key', key);
  }

  setScale(scale) {
    return this.setAllAttrs('scale', scale);
  }

  setMode(mode) {
    return this.setAllAttrs('mode', mode);
  }

  insert(chord, idx) {
    const newProgression = [
      ..._.slice([...this.progression], 0, idx - 1),
      chord,
      ..._.slice([...this.progression], idx - 1),
    ];
    return new Progression(newProgression);
  }
}
