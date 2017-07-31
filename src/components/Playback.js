import React from 'react';

class Playback extends React.Component {

  shouldComponentUpdate() {
    const notesToPlay = this.props.state.recordedEvents[`${this.props.state.breathcontrollercoarse}.${this.props.state.programchange}.${this.props.state.channelaftertouch}`];
    (notesToPlay || []).forEach(e => this.props.state.outputDevice.playNote(e.note.number, 1, { velocity: 0.5}))
    return true;
  }

  render() {
    return <div>{`Recording: ${this.props.state.recording}`}</div>
  }
}

export default Playback
