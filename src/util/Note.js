import { notes, semitones } from '../constants';

class Note {
  constructor(note) {
    this.root = note;
    this.note = note;
    this.noteIndex = notes.indexOf(note);
    this.minThirdIndex = this.findSemitoneIndex(3);
    this.majThirdIndex = this.findSemitoneIndex(4);
    this.fifthIndex = this.findSemitoneIndex(7);
    this.majSixthIndex = this.findSemitoneIndex(9);
    this.minSeventhIndex = this.findSemitoneIndex(10);
    this.majSeventhIndex = this.findSemitoneIndex(11);
    this.ninthIndex = this.findSemitoneIndex(14);
    this.eleventhIndex = this.findSemitoneIndex(17);
    this.thirteenthIndex = this.findSemitoneIndex(21);

    this.minThird = notes[this.minThirdIndex];
    this.majThird = notes[this.majThirdIndex];
    this.fifth = notes[this.fifthIndex];
    this.majSixth = notes[this.majSixthIndex];
    this.minSeventh = notes[this.minSeventhIndex];
    this.majSeventh = notes[this.majSeventhIndex];
    this.ninth = notes[this.ninthIndex];
    this.eleventh = notes[this.eleventhIndex];
    this.thirteenth = notes[this.thirteenthIndex];
  }

  findSemitoneIndex(semitones){
    return (this.noteIndex + semitones) % notes.length;
  }
}
module.exports = Note;
