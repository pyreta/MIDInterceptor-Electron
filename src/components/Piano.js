import React from 'react';
import WebMidi from 'webmidi';
import './Piano.css';

export class Piano extends React.Component {

  componentWillMount() {

  }

  render() {
    console.log(`WebMidi:`, WebMidi)
    return (
      <div className="base">
        <div className="key-container">
        </div>
      </div>
    )
  }
}

export default Piano
