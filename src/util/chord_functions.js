import * as constants from '../constants';
import Chord from './Chord'
import Note from './Note'

module.exports = {

  randomEl(array){
    return array[Math.floor(Math.random() * array.length)];
  },

  randomNote() {
    // TODO placeholder
    return this.randomEl(constants.notes);
  },

  randomVoice(){
    if (Math.random() > 0.5) return '';
    return this.randomEl(['7','7','9','11','13']);
  },

  randomDominant() {
    return this.randomEl([false, true, true, false]);
  },

  randomCharacter(){
    return this.randomEl(['Maj', 'min']);
  },

  generate(){
    let chosenVoice = this.randomVoice();
    let chosenDominant = chosenVoice === '' ? false : this.randomDominant();
    let chordData = {
      note: this.randomNote(),
      character: this.randomCharacter(),
      voice: chosenVoice,
      dominant: chosenDominant
    };
    return new Chord(chordData);
  }
};
