import React from 'react';
import './Piano.css';
import PianoKey from './PianoKey';

const PianoOctave = props =>
  <div style={{display: 'inline-flex'}}>
    {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note, idx) =>
      <PianoKey note={note} key={idx} {...props} />)}
  </div>

class Piano extends React.Component {

  onKeyClick(note, number) {
    console.log(`note:`, note)
    console.log(`number:`, number)
  }

  render() {
    return (
      <div className="base">
        <PianoOctave octave={1} onKeyClick={this.onKeyClick.bind(this)} {...this.props} />
        <PianoOctave octave={2} onKeyClick={this.onKeyClick.bind(this)} {...this.props} />
      </div>
    )
  }
}

export default Piano
