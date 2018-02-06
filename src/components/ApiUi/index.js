import React from 'react';
import { connect } from 'react-redux';
import Progression from '../../models/Progression';
import MidiDeviceSetup from './MidiDeviceSetup';
import Dropdowns from './Dropdowns';
import ModeRows from './ModeRows';


export class ApiUi extends React.Component {
  modes() {
    return this.props.progression
      .last()
      .getScale()
      .get('modes');
  }
  render() {
    return (
      <div>
        <MidiDeviceSetup />
        <Dropdowns {...this.props} />
        <ModeRows {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = ({ progression, devices: { outputDevice } }) => ({
  progression: new Progression(progression),
  playChord: chord => outputDevice.playNote(chord, 1, { velocity: 0.5 }),
  stopChord: chord => outputDevice.stopNote(chord, 1),
});

const mapDispatchToProps = dispatch => ({
  changeScale: e => dispatch({ type: 'CHANGE_SCALE', payload: e.target.value }),
  changeKey: e => dispatch({ type: 'CHANGE_KEY', payload: e.target.value }),
  changeMode: e => dispatch({ type: 'CHANGE_MODE', payload: e.target.value }),
  adjustChord: (interval, value, on, idx) =>
    dispatch({ type: 'ADJUST_CHORD', payload: { interval, value, on, idx } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiUi);
