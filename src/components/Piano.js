import React from 'react';
import './Piano.css';
import PianoKey from './PianoKey';

const PianoOctave = props =>
  <div style={{display: 'inline-flex'}}>
    {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note, idx) =>
      <PianoKey note={note} key={idx} {...props} />)}
  </div>

class Piano extends React.Component {

  render() {
    return (
      <div className="base">
        <PianoOctave octave={3} {...this.props} />
        <PianoOctave octave={4} {...this.props} />
        <PianoOctave octave={5} {...this.props} />
        <PianoOctave octave={6} {...this.props} />
      </div>
    )
  }
}

export default Piano
