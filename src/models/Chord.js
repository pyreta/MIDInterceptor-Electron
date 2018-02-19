import _ from 'lodash';
import Scale from './Scale';
import Progression from './Progression';
import chordDictionary from '../constants/chordDictionary';
import {
  scales,
  intervalTypes,
  notes,
  intervals,
  romanNumerals,
} from '../constants/theory';
import { getVoicing, matchChordVoicings, rotateVoice, convertNotesToVoicing } from './helpers';

const ascending = (a, b) => a - b;
const defaultChord = {
  key: 0,
  octave: 5,
  scale: 'major',
  mode: 1,
  chord: 1,
  notes: { 1: 0, 3: 0, 5: 0 },
  voicing: {
    1: [0],
    3: [0],
    5: [0],
  },
};

class Chord {
  static newChordFromScale(chord, scale, progression) {
    return new Chord({ scale, chord }, progression);
  }

  static fromMinorScale(chord, progression) {
    return Chord.newChordFromScale(chord, 'minor', progression);
  }

  static fromMajorScale(chord, progression) {
    return Chord.newChordFromScale(chord, 'major', progression);
  }

  static wrap(...args) {
    return new Chord(...args);
  }

  static fromRoot(key) {
    return new Chord({ key });
  }

  constructor(chord = {}, progression) {
    // TODO what if only a progression is passed into constuctor?
    this.chord = { ...defaultChord, ...chord };
    this.progression = progression || new Progression([chord]);
  }

  clone(attrs = {}) {
    return new Chord({ ...this.chord, ...attrs }, this.progression);
  }

  // *************** change chord

  sus(i1 = 4, i2) {
    const sus = this.removeNote(3).addNote(i1);
    return i2 ? sus.addNote(i2) : sus;
  }

  secondaryDominant() {
    return new Chord({ key: this.root().value(), chord: 5 }).addNote(7);
  }

  tritoneSubstitution() {
    // TODO take scales into account
    const notes = { 1: 0, 3: 0, 5: 0, 7: 0 };
    return this.set('key', this.get('key') + 6).setNotes(notes);
  }

  diminishedSubstitution() {
    // TODO take scales into account
    const notes = { 1: 0, 3: -1, 5: -1, 7: -1 };
    return this.set('key', this.get('key') + 4).setNotes(notes);
  }

  incrementKey(add = 1) {
    return new Chord(
      { ...this.chord, key: this.get('key') + add },
      this.progression,
    );
  }

  chromaticSubstitution() {
    return [this.makeDominantFifth().incrementKey(), this.clone()];
  }

  conjugateMinorSubstitution() {
    // TODO do!
    return this;
  }

  twoFiveSubstitution() {
    return [
      this.makeDominantFifth()
        .set('chord', 2)
        .resetNotes(),
      this.clone(),
    ];
  }

  resetNotes() {
    return this.setNotes({ 1: 0, 3: 0, 5: 0 });
  }

  fourthMinorSubstitution() {
    return this.makeDominantFifth()
      .set('chord', 4)
      .set('scale', 'minor')
      .set('mode', 1)
      .resetNotes();
  }

  makeDominantFifth() {
    const root = this.root().value() + 5;
    return Chord.fromRoot(root)
      .set('chord', 5)
      .addNote(7);
  }

  // ****************** change chord

  setNotes(notes) {
    return new Chord({ ...this.chord, notes }, this.progression);
  }

  addNote(interval, value = 0) {
    const chord = new Chord(
      {
        ...this.chord,
        notes: { ...this.chord.notes, [interval]: value },
        voicing: {...this.get('voicing'), [interval]: [0] }
      },
      this.progression,
    );
    return interval > 7 ? chord.addNote(7) : chord;
  }

  removeNote(interval) {
    const notes = { ...this.get('notes') };
    delete notes[interval];
    return this.setNotes(notes);
  }

  data() {
    return { ...this.chord };
  }

  get(attr) {
    return this.chord[attr];
  }

  set(attr, value) {
    return new Chord({ ...this.chord, [attr]: value }, this.progression);
  }

  getScale() {
    const chordReference = this;
    return new Scale(scales[this.chord.scale], chordReference);
  }

  getMode() {
    const chordReference = this;
    return this.getScale().getMode(this.chord.mode, chordReference);
  }

  getNoteFromInterval(i, n) {
    const root = this.root().value();
    const interval = intervals[i];
    const intervalAdjustment = this.get('notes')[n];
    const mod = notes.length * 2;
    return root + interval + intervalAdjustment % mod;
  }

  getDiatonicNote(n) {
    const extendedIntervals = this.getMode().intervalsFromRoot({ octaves: 2 });
    const intervalIdx = n + this.get('chord') - 2;
    const key = this.get('key');
    const interval = extendedIntervals[intervalIdx];
    const intervalAdjustment = this.get('notes')[n];
    const mod = notes.length * 2;
    return interval + intervalAdjustment + key % mod;
  }

  noteValues() {
    return Object.keys(this.get('notes')).reduce((acc, n) => {
      const note = parseInt(n, 10);
      let newNote;
      if (note === 2) newNote = this.getNoteFromInterval('major2', note);
      if (note === 4) newNote = this.getNoteFromInterval('perfect4', note);
      if (note === 6) newNote = this.getNoteFromInterval('major6', note);
      if (note === 9) newNote = this.getNoteFromInterval('perfect9', note);
      if (note === 11) newNote = this.getNoteFromInterval('perfect11', note);
      if (note === 13) newNote = this.getNoteFromInterval('perfect13', note);
      if (!newNote) newNote = this.getDiatonicNote(note);
      return [...acc, newNote];
    }, []);
  }

  noteNames() {
    return this.noteValues().map(i => notes[i % 12]);
  }

  root() {
    const noteIdx = this.get('chord') - 1;
    const intervals = this.getMode().intervalsFromRoot();
    const value = this.chord.key + intervals[noteIdx];
    const name = notes[value % 12];
    return {
      name: () => name,
      value: () => value,
    };
  }

  key() {
    return {
      name: () => notes[this.chord.key % 12],
      value: () => this.chord.key % 12,
    };
  }

  analyze() {
    const analysis = {};
    const intervals = Object.keys(this.chord.notes)
      .map(i => {
        return parseInt(i, 10);
      })
      .sort(ascending)
      .slice(1);
    const intervalValues = this.noteValues()
      .map(i => i - this.root().value())
      .sort(ascending)
      .slice(1);
    intervals.forEach((int, idx) => {
      analysis[int] = intervalTypes[intervalValues[idx]][int];
    });
    return analysis;
  }

  signature() {
    const analysis = this.analyze();
    return Object.keys(analysis)
      .map(i => parseInt(i, 10))
      .sort(ascending)
      .reduce((signature, interval) => {
        return signature + analysis[interval] + interval;
      }, '');
  }

  isValid() {
    const sig = this.signature();
    const validity = !!chordDictionary[sig];
    if (validity) return validity;
    // console.log('missing:', sig);
    // console.log('');
  }

  name(format = 'abreviation') {
    const sig = this.signature();
    if (chordDictionary[sig]) {
      const extension = chordDictionary[sig][format];
      return this.root().name() + extension;
    }
    return `Unknown Chord: ${sig}`;
  }

  unwrap() {
    return this.chord;
  }

  isMajor() {
    const [first, third] = this.noteValues();
    return third - first > 3;
  }

  chordDefinition() {
    return chordDictionary[this.signature()];
  }

  romanNumeral() {
    const numeral = romanNumerals[this.get('chord') - 1];
    return this.chordDefinition().getRomanNumeral(
      this.isMajor() ? numeral.toUpperCase() : numeral,
    );
  }

  voicing(options) {
    return getVoicing(this, options);
  }

  findDistance(lastVoicing, closestNote) {
    return lastVoicing.map(x => Math.abs(x - closestNote))
  }

  matchVoicingToChord(otherChord) {
    return matchChordVoicings(this, otherChord);
  }

  inversion(n) {
    const vals = this.voicing().noteValues();
    const newV = rotateVoice(vals, n % vals.length);
    return this.clone({ voicing: convertNotesToVoicing(this, newV)});
  }
}

export default Chord;
