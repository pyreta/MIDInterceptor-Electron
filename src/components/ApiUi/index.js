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

  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.key === '7') this.props.addSeven();
      if (e.key === '4') this.props.addSus();
    })
    document.addEventListener('keyup', e => {
      if (e.key === '7') this.props.removeSeven();
      if (e.key === '4') this.props.removeSus();
    })
  }

  render() {
    return (
      <div>
        <button onMouseDown={this.props.addSeven} onMouseUp={this.props.removeSeven}>Seven!</button>
        <MidiDeviceSetup />
        <Dropdowns {...this.props} tonic={this.props.tonic}/>
        <ModeRows {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = ({ tonic, progression, devices: { outputDevice } }) => ({
  tonic,
  progression: new Progression(progression),
  playChord: chord => outputDevice.playNote(chord, 1, { velocity: 0.5 }),
  stopChord: chord => outputDevice.stopNote(chord, 1),
});

const mapDispatchToProps = dispatch => ({
  changeScale: e => dispatch({ type: 'CHANGE_SCALE', payload: e.target.value }),
  changeKey: e => dispatch({ type: 'CHANGE_KEY', payload: parseInt(e.target.value, 10) }),
  changeMode: e => dispatch({ type: 'CHANGE_MODE', payload: e.target.value }),
  adjustChord: (interval, value, on, idx) =>
    dispatch({ type: 'ADJUST_CHORD', payload: { interval, value, on, idx } }),
  addSeven: () => dispatch({ type: 'UPDATE_CHORD_BODY', payload: {1: 0, 3: 0, 5: 0, 7: 0} }),
  removeSeven: () => dispatch({ type: 'UPDATE_CHORD_BODY', payload: {1: 0, 3: 0, 5: 0 } }),
  addSus: () => dispatch({ type: 'UPDATE_CHORD_BODY', payload: {1: 0, 4: 0, 5: 0 } }),
  removeSus: () => dispatch({ type: 'UPDATE_CHORD_BODY', payload: {1: 0, 3: 0, 5: 0 } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiUi);
