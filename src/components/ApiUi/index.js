import React from 'react';
import { connect } from 'react-redux';
import MidiDeviceSetup from './MidiDeviceSetup';
import KeySelect from './KeySelect';
import ModeRows from './ModeRows';
import actions from '../../actions';

let held = false;

const keyCache = {};

export class ApiUi extends React.Component {
  decreaseKey() {
    return this.props.tonic === 0 ?
      this.props.changeKey(11) :
      this.props.changeKey(this.props.tonic - 1)
  }
  increaseKey() {
    return this.props.changeKey((this.props.tonic + 1) % 12)
  }
  componentDidMount() {
    document.addEventListener('keydown', e => {
      if (e.key === '4') {
        if (keyCache['4']) return;
        keyCache['2'] ?
        this.props.addNotes({ 1: 0, 2: 0, 4: 0, 5: 0 }) :
        this.props.addNotes({ 1: 0, 4: 0, 5: 0 })
        keyCache['4'] = true;
      }
      if (e.key === '2') {
        if (keyCache['2']) return;
        keyCache['4'] ?
        this.props.addNotes({ 1: 0, 2: 0, 4: 0, 5: 0 }) :
        this.props.addNotes({ 1: 0, 4: 0, 5: 0 })
        keyCache['2'] = true;
      }
      if (held) return;
      if (e.keyCode === 37) this.decreaseKey();
      if (e.keyCode === 39) this.increaseKey();
      if (e.key === 's') {
        this.props.addKeyPress(e.keyCode);
        keyCache['s'] = true;
      }
      if (e.key === '7') {
        this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0 });
        keyCache['7'] = true;
      }
      // if (e.key === '2') {
      //   this.props.addNotes({ 1: 0, 2: 0, 5: 0 });
      //   keyCache['2'] = true;
      // }
      if (e.key === '6') {
        this.props.addNotes({ 1: 0, 3: 0, 5: 0, 6: 0 });
        keyCache['6'] = true;
      }
      if (e.key === '9') {
        this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0, 9: 0 });
        keyCache['9'] = true;
      }
      if (e.key === '1') {
        this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0, 11: 0 });
        keyCache['1'] = true;
      }
      if (e.key === '3') {
        this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0, 13: 0 });
        keyCache['3'] = true;
      }
      held = true;
    });
    document.addEventListener('keyup', e => {
      held = false;

      if (e.key === '4') {
        keyCache['2'] ?
        this.props.addNotes({ 1: 0, 2: 0, 5: 0 }) :
        this.props.addNotes({ 1: 0, 3: 0, 5: 0 })
        keyCache['4'] = false;
      }
      if (e.key === '2') {
        keyCache['4'] ?
        this.props.addNotes({ 1: 0, 4: 0, 5: 0 }) :
        this.props.addNotes({ 1: 0, 3: 0, 5: 0 })
        keyCache['2'] = false;
      }

      if (e.key === 's') {
        this.props.removeKeyPress(e.keyCode);
        keyCache['s'] = false;
      }
      if (e.key === '7') {
        this.props.addNotes({ 1: 0, 3: 0, 5: 0 });
        keyCache['7'] = false;
      }
      if (e.key === '6') {
        this.props.addNotes({ 1: 0, 3: 0, 5: 0 });
        keyCache['6'] = false;
      }
      if (e.key === '9') {
        this.props.addNotes({ 1: 0, 3: 0, 5: 0 });
        keyCache['9'] = false;
      }
      if (e.key === '1') {
        this.props.addNotes({ 1: 0, 3: 0, 5: 0 });
        keyCache['1'] = false;
      }
      if (e.key === '3') {
        this.props.addNotes({ 1: 0, 3: 0, 5: 0 });
        keyCache['3'] = false;
      }
    });
  }

  render() {
    return (
      <MidiDeviceSetup>
        <KeySelect changeKey={this.props.changeKey} tonic={this.props.tonic} />
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
  changeKey: key => dispatch(actions.CHANGE_KEY(key)),
  addNotes: notes => dispatch(actions.UPDATE_CHORD_BODY(notes)),
  registerChord: chord => dispatch(actions.PLAY_CHORD(chord)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiUi);
