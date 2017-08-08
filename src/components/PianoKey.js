import React from 'react';
import WebMidi from 'webmidi';
import deleteKey from '../helpers/deleteKey';
import { notes } from '../constants';

const Key = ({ type, note, octave, outputDevice, ...props }) => {
  const noteString = `${note}${type==='black' ? '#' : ''}`;
  const noteNumber = WebMidi['_notes'].indexOf(noteString) + 12 * octave;
  const held = props[props.notesKey][noteNumber] ? ' held' : '';
  return (
    <div
      className={`${type}-key key${held}${props.notesKey === 'filteredNotes' ? ' filtered-piano' : ''}`}
      onMouseDown={() => {
        outputDevice.playNote(noteNumber, 1, { velocity: 0.35 });
        props.setNotes({...props.notes, [noteNumber]: { note: { number: noteNumber, name: notes[noteNumber % 12] } }}, 'filter');
      }}
      onMouseUp={() => {
        outputDevice.stopNote(noteNumber);
        props.setNotes(deleteKey(props.notes, noteNumber), 'filter');
      }}
    ><span className={`${type}-note`}>{noteString}</span></div>)
}

class PianoKey extends React.Component {

  shouldRenderBlackKey() {
    return !(['B', 'E'].includes(this.props.note));
  }

  render() {
    return (
      <div className="key-container">
        <Key {...this.props} type="white" />
        {this.shouldRenderBlackKey() &&
        <Key {...this.props} type="black" />}
      </div>
    )
  }
}

export default PianoKey
