import React from 'react';
import { connect } from 'react-redux';
import MidiDeviceSetup from './MidiDeviceSetup';
import KeySelect from './KeySelect';
import ModeRows from './ModeRows';
import ModeSelect from './ModeSelect';
import Buttons from './Buttons';
import actions from '../../actions';

// document.addEventListener('keydown', e => {
//   // keyCache[e.key] = true;
//   if (e.key === '4') {
//     if (keyCache['4']) return;
//     keyCache['2'] ?
//     this.props.addNotes({ 1: 0, 2: 0, 4: 0, 5: 0 }) :
//     this.props.addNotes({ 1: 0, 4: 0, 5: 0 })
//     keyCache['4'] = true;
//   }
//   if (e.key === '2') {
//     if (keyCache['2']) return;
//     keyCache['4'] ?
//     this.props.addNotes({ 1: 0, 2: 0, 4: 0, 5: 0 }) :
//     this.props.addNotes({ 1: 0, 2: 0, 5: 0 })
//     keyCache['2'] = true;
//   }
//
//   // if (e.key === 'q') {
//   //   if (this.props.keysPressed.q) return;
//   //   this.props.addKeyPress('q');
//   // }
//   // if (e.key === 'w') {
//   //   if (this.props.keysPressed.w) return;
//   //   this.props.addKeyPress('w');
//   // }
//   // if (e.key === 'e') {
//   //   if (this.props.keysPressed.e) return;
//   //   this.props.addKeyPress('e');
//   // }
//
//   if (held) return;
//   if (e.keyCode === 37) this.decreaseKey();
//   if (e.keyCode === 39) this.increaseKey();
//   if (e.key === 's') {
//     this.props.addKeyPress(e.keyCode);
//     keyCache['s'] = true;
//   }
//   if (e.key === '7') {
//     this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0 });
//     keyCache['7'] = true;
//   }
//   if (e.key === '6') {
//     this.props.addNotes({ 1: 0, 3: 0, 5: 0, 6: 0 });
//     keyCache['6'] = true;
//   }
//   if (e.key === '9') {
//     this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0, 9: 0 });
//     keyCache['9'] = true;
//   }
//   if (e.key === '1') {
//     this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0, 11: 0 });
//     keyCache['1'] = true;
//   }
//   if (e.key === '3') {
//     this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0, 13: 0 });
//     keyCache['3'] = true;
//   }
//   // if(['q', 'e', 'w'].includes(e.key)) this.forceUpdate();
//   held = true;
// });

// document.addEventListener('keyup', e => {
//   held = false;
//   // keyCache[e.key] = false;
//   if (e.key === '4') {
//     keyCache['2'] ?
//     this.props.addNotes({ 1: 0, 2: 0, 5: 0 }) :
//     this.props.addNotes({ 1: 0, 3: 0, 5: 0 })
//     keyCache['4'] = false;
//   }
//   if (e.key === '2') {
//     keyCache['4'] ?
//     this.props.addNotes({ 1: 0, 4: 0, 5: 0 }) :
//     this.props.addNotes({ 1: 0, 3: 0, 5: 0 })
//     keyCache['2'] = false;
//   }
//
//   if (e.key === 's') {
//     this.props.removeKeyPress(e.keyCode);
//     keyCache['s'] = false;
//   }
//   if (e.key === '7') {
//     this.props.addNotes({ 1: 0, 3: 0, 5: 0 });
//     keyCache['7'] = false;
//   }
//   if (e.key === '6') {
//     this.props.addNotes({ 1: 0, 3: 0, 5: 0 });
//     keyCache['6'] = false;
//   }
//   if (e.key === '9') {
//     this.props.addNotes({ 1: 0, 3: 0, 5: 0 });
//     keyCache['9'] = false;
//   }
//   if (e.key === '1') {
//     this.props.addNotes({ 1: 0, 3: 0, 5: 0 });
//     keyCache['1'] = false;
//   }
//   if (e.key === '3') {
//     this.props.addNotes({ 1: 0, 3: 0, 5: 0 });
//     keyCache['3'] = false;
//   }
//   if (e.key === 'q') {
//     this.props.removeKeyPress('q');
//   }
//   if (e.key === 'w') {
//     this.props.removeKeyPress('w');
//   }
//   if (e.key === 'e') {
//     this.props.removeKeyPress('e');
//   }
//   // if(['q', 'e', 'w'].includes(e.key)) this.forceUpdate();
// });

export class ApiUi extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  decreaseKey() {
    return this.props.tonic === 0
      ? this.props.changeKey(11)
      : this.props.changeKey(this.props.tonic - 1);
  }

  increaseKey() {
    return this.props.changeKey((this.props.tonic + 1) % 12);
  }

  setupKeyBindings() {
    document.addEventListener('keydown', e => {
      if (this.state[e.key]) return;
      this.setState({ [e.key]: true });
      if (e.key === '7') this.props.addNotes({ 1: 0, 3: 0, 5: 0, 7: 0 });
      if (e.key === '6') this.props.addNotes({ 1: 0, 3: 0, 5: 0, 6: 0 });
      if (e.key === '9') this.props.addNotes({ 1: 0, 3: 0, 5: 0, 9: 0 });
      if (e.keyCode === 37) this.decreaseKey();
      if (e.keyCode === 39) this.increaseKey();
      if (e.key === 'a') this.props.toggleAutoVoicing();
    });
    document.addEventListener('keyup', e => {
      this.setState({ [e.key]: false });
      if (parseInt(e.key, 10) >= 6) this.props.addNotes({ 1: 0, 3: 0, 5: 0 });
    });
  }

  componentDidMount() {
    this.setupKeyBindings();
  }

  inversion() {
    if (this.state.r) return 3;
    if (this.state.e) return 2;
    if (this.state.w) return 1;
    if (this.state.q) return 99;
    return 0;
  }

  secondary() {
    if (this.state.s) return 4;
    if (this.state.d) return 5;
    if (this.state.f) return 7;
    return 0;
  }

  render() {
    return (
      <MidiDeviceSetup>
        <ModeSelect />
        <Buttons />
        <KeySelect
          changeKey={this.props.changeKey}
          playChord={this.props.playChord}
          stopChord={this.props.stopChord}
          tonic={this.props.tonic}
        />
        <ModeRows inversion={this.inversion()} secondary={this.secondary()} />
      </MidiDeviceSetup>
    );
  }
}

const mapStateToProps = ({
  tonic,
  progression,
  devices: { outputDevice },
  keysPressed,
}) => ({
  keysPressed,
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
  toggleAutoVoicing: () => dispatch(actions.TOGGLE_AUTO_VOICING()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiUi);
