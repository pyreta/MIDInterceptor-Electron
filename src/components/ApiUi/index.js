import React from 'react';
import { connect } from 'react-redux';
import MidiDeviceSetup from './MidiDeviceSetup';
import Dropdowns from './Dropdowns';
import ModeRows from './ModeRows';
import actions from '../../actions';

let held = false;

export class ApiUi extends React.Component {

  componentDidMount() {
    document.addEventListener('keydown', e => {

      if (held) return;
      if (e.key === 's') this.props.addKeyPress(e.keyCode);
      if (e.key === '7') this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0 });
      if (e.key === '4') this.props.addNotes({ 1: 0, 4: 0, 5: 0 });
      if (e.key === '2') this.props.addNotes({ 1: 0, 2: 0, 5: 0 });
      if (e.key === '6') this.props.addNotes({ 1: 0, 3: 0, 5: 0, 6: 0 });
      if (e.key === '9') this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0, 9: 0 });
      if (e.key === '1') this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0, 11: 0 });
      if (e.key === '3') this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0, 13: 0 });
      held = true;
    });
    document.addEventListener('keyup', e => {
      held = false;
      if (e.key === 's') this.props.removeKeyPress(e.keyCode);
      this.props.addNotes({ 1: 0, 3: 0, 5: 0 });
    });
  }

  render() {
    return (
      <MidiDeviceSetup>
        <Dropdowns changeKey={this.props.changeKey} tonic={this.props.tonic} />
        <ModeRows />
      </MidiDeviceSetup>
    );
  }
}

const mapStateToProps = ({
  tonic,
  progression,
  devices: { outputDevice },
}) => ({
  tonic,
  playChord: chord => outputDevice.playNote(chord, 1, { velocity: 0.5 }),
  stopChord: chord => outputDevice.stopNote(chord, 1),
});

const mapDispatchToProps = dispatch => ({
  addKeyPress: k => dispatch(actions.ADD_KEY_PRESS(k)),
  removeKeyPress: k => dispatch(actions.REMOVE_KEY_PRESS(k)),
  changeKey: e => dispatch(actions.CHANGE_KEY(parseInt(e.target.value, 10))),
  addNotes: notes => dispatch(actions.UPDATE_CHORD_BODY(notes)),
  registerChord: chord => dispatch(actions.PLAY_CHORD(chord)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiUi);
