import React from 'react';
import WebMidi from 'webmidi';
import deleteKey from '../helpers/deleteKey';

const Key = ({ type, note, octave, outputDevice, notes = {}, ...props }) => {
  const noteString = `${note}${type==='black' ? '#' : ''}`;
  const noteNumber = WebMidi['_notes'].indexOf(noteString) + 12 * octave;

  return (
    <div
      className={`${type}-key key${notes[noteNumber] ? ' held' : ''}`}
      onMouseDown={() => {
        outputDevice.playNote(noteNumber, 1, { velocity: 0.35 });
        props.addNote({number: noteNumber, note: true});
      }}
      onMouseUp={() => {
        outputDevice.stopNote(noteNumber);
        props.deleteNote({number: noteNumber, note: true});
      }}
    ><span className={`${type}-note`}>{noteString}</span></div>)
}

class PianoKey extends React.Component {

  shouldRenderBlackKey() {
    return !(['B', 'E'].includes(this.props.note));
  }

  get notes() {
    return ({
      add: note => ({ ...this.props.notes, [note.number]: note }),
      delete: note => deleteKey(this.props.notes, note.number)
    })
  }

  addNote(note) {
    return this.props.dispatch({notes: this.notes.add(note)});
  }

  deleteNote(note) {
    return this.props.dispatch({notes: this.notes.delete(note)});
  }

  noteHandlers() {
    return {
      addNote: this.addNote.bind(this),
      deleteNote: this.deleteNote.bind(this)
    }
  }

  render() {
    return (
        <div className="key-container">
          <Key {...this.props} type="white" {...this.noteHandlers()} />
          {this.shouldRenderBlackKey() &&
          <Key {...this.props} type="black" {...this.noteHandlers()} />}
        </div>
    )
  }
}

export default PianoKey
