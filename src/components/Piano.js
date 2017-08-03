import React from 'react';
import WebMidi from 'webmidi';
import './Piano.css';
import PianoKey from './PianoKey';

const PianoOctave = () =>
  <div style={{display: 'inline-flex'}}>
    <PianoKey blackKey />
    <PianoKey blackKey />
    <PianoKey />
    <PianoKey blackKey />
    <PianoKey blackKey />
    <PianoKey blackKey />
    <PianoKey />
  </div>

class Piano extends React.Component {

  componentWillMount() {

  }

  render() {
    console.log(`WebMidi:`, WebMidi)
    return (
      <div className="base">
        <PianoOctave />
        <PianoOctave />
        <PianoOctave />
        <PianoOctave />
      </div>
    )
  }
}

export default Piano
