import React from 'react';
import WebMidi from 'webmidi';

const Key = ({ type, note, octave, onKeyClick, notes = {}, ...props }) => {
  const noteString = `${note}${type==='black' ? '#' : ''}`;
  const noteNumber = WebMidi['_notes'].indexOf(noteString) + 12 * octave;

  return (
    <div
      className={`${type}-key key${notes[noteNumber] ? ' held' : ''}`}
      onClick={() => onKeyClick(`${noteString}${octave}`, noteNumber)}
    />)
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
