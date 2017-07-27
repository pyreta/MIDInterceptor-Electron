import React from 'react';

class Playback extends React.Component {

  shouldComponentUpdate() {
    const notesToPlay = this.props.state.recordedNotes[`${this.props.state.breathcontrollercoarse}.${this.props.state.programchange}.${this.props.state.channelaftertouch}`]
    notesToPlay && this.props.state.outputDevice.playNote(notesToPlay, 1, { velocity: 0.5})
    return true;
  }

  render() {
    return <div>Playback</div>
  }
}

export default Playback
