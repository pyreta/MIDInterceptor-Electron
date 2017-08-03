import React from 'react';
import WebMidi from 'webmidi';
// import './PianoKey.css';

class PianoKey extends React.Component {

  componentWillMount() {

  }

  render() {
    console.log(`WebMidi:`, WebMidi)
    return (
        <div className="key-container">
        <div className="white-key key" />
          {this.props.blackKey && <div className="black-key key" />}
        </div>
    )
  }
}

export default PianoKey
