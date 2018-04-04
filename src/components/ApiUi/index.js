import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import MidiDeviceSetup from './MidiDeviceSetup';
import KeySelect from './KeySelect';
import ModeRows from './ModeRows';
import ModeSelect from './ModeSelect';
import Buttons from './Buttons';
import actions from '../../actions';
import ChordModel from '../../models/Chord';

import Progression from '../../models/Progression';
import * as Icons from './Icons';
import DeviceManager from './DeviceManager';
import DeviceSetup, { connectMidiController } from './DeviceSetup';
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

const Wrapper = styled.div`
  width: 619px;
  display: flex;
  border: 2px solid #3c5e85;
  box-shadow: 1px 11px 31px rgba(0,0,0,0.9);
  border-radius: 10px;
  padding: 7px;
  background: rgb(255, 255, 255);
  flex-direction: column;
`;

const Gear = styled(Icons.Gear)`
  fill: #2a72e1;
  position: absolute;
  padding: 5px;
  top: 0px;
  left: 0px;
`;

const DropdownWrapper = styled.div`
  background-color: white;
  position: absolute;
  left: 29px;
  top: 10px;
  border-radius: 2px;
  box-shadow: 0 6px 31px rgb(15, 15, 15);
  font-size: 12px;
`;

const Check = styled.div`
  color: #4088f6;
  display: flex;
  ${({ visible }) => (visible ? '' : 'visibility: hidden;')};
`;

const SettingsOption = styled.div`
  padding: 5px 20px 5px 5px;
  display: flex;
  cursor: pointer;
  user-select: none;
  &:hover {
    background: rgba(43,123,245,0.3);
  }
`;

export class ApiUi extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  ColumnDropdown = ({ rows }) => {
    const isInverted = !!this.inversion();
    return (
    <DropdownWrapper>

      <SettingsOption onClick={this.props.toggleRomanNumerals}>
        <Check visible={this.props.showRomanNumerals}>
          <Icons.Check size={11} />
        </Check>
        Roman Numeral Notation
      </SettingsOption>

      <SettingsOption onClick={this.props.toggleNotesInCommin}>
        <Check visible={this.props.showNotesInCommon}>
          <Icons.Check size={11} />
        </Check>
        Highlight Chords with common notes
      </SettingsOption>

      <SettingsOption onClick={this.props.toggleRootNoteDecorator}>
        <Check visible={this.props.voicingDecorator === 'rootNote' && !isInverted}>
          <Icons.Check size={11} />
        </Check>
        Add root bass note
      </SettingsOption>

      <SettingsOption onClick={this.props.toggleBassNoteDecorator}>
        <Check visible={
          this.props.voicingDecorator === 'bassNote' ||
          (this.props.voicingDecorator === 'rootNote' && isInverted)
        }>
          <Icons.Check size={11} />
        </Check>
        Add inverted bass note
      </SettingsOption>

      <SettingsOption onClick={this.props.toggleAutoVoicing}>
        <Check visible={this.props.autoVoicing}>
          <Icons.Check size={11} />
        </Check>
        Auto voicing
      </SettingsOption>

      <SettingsOption onClick={this.props.toggleScales}>
        <Check visible={this.props.showScales}>
          <Icons.Check size={11} />
        </Check>
        Show scales
      </SettingsOption>

      <DeviceManager rows={rows} connectMidiController={connectMidiController} />
    </DropdownWrapper>
  )};

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

  chordRows() {
    const {
      modeRows,
      tonic,
      chordBody,
      secondaryDominants,
      autoVoicing,
      lastPlayedChord,
    } = this.props;

    const inversion = this.inversion();
    const secondary = this.secondary();
    return Object.keys(modeRows).reduce((acc, scale) => {
      const scaleModes = Object.keys(modeRows[scale])
        .filter(mode => modeRows[scale][mode])
        .map((mode, idx) => {
          const progression = Progression.allChords(
            {
              key: tonic,
              scale,
              mode,
              notes: chordBody,
            },
            secondaryDominants,
          ).setInversion(inversion);
          return progression.chords().map((c, i) => {
            const voicedChord =
              autoVoicing && inversion < 1
                ? c
                    .secondary(secondary)
                    .matchVoicingToChord({ lastPlayedChord, method: 'bijective' })
                : c.secondary(secondary).matchOctaveToChord(lastPlayedChord);
            return voicedChord;
          });
        });

      return [...acc, ...scaleModes]
    }, []);
  }

  render() {
    const chordRows = this.chordRows();
    return (
      <div>
      <Gear size={20} onClick={this.props.toggleSettings}/>
      {this.props.showSettingsDropdown && <this.ColumnDropdown rows={chordRows}/>}
      <MidiDeviceSetup rows={chordRows}>
        <DeviceSetup rows={chordRows} />
        <Wrapper>
        { this.props.showScales && <ModeSelect /> }
        <KeySelect
          changeKey={this.props.changeKey}
          playChord={this.props.playChord}
          stopChord={this.props.stopChord}
          tonic={this.props.tonic}
          />
        <Buttons isInverted={!!this.inversion()} />
        <ModeRows
          rows={chordRows}
          inversion={this.inversion()}
          selectedModeRow={this.props.selectedModeRow}
        />
        </Wrapper>
      </MidiDeviceSetup>
      </div>
    );
  }
}

const mapStateToProps = ({
  tonic,
  progression,
  devices: { outputDevice },
  keysPressed,
  // modeRowsProps
  modeRows,
  chordBody,
  autoVoicing,
  lastPlayedChord,
  selectedModeRow,
  settings,
  voicingDecorator,
}) => ({
  keysPressed,
  tonic,
  playChord: chord => outputDevice.playNote(chord, 1, { velocity: 0.7 }),
  stopChord: chord => outputDevice.stopNote(chord, 1),
  // modeRowsProps
  chordBody,
  autoVoicing,
  lastPlayedChord: new ChordModel(lastPlayedChord),
  secondaryDominants: keysPressed['83'],
  modeRows,
  selectedModeRow,
  showScales: settings.showScales,
  showDeviceSetup: settings.showDeviceSetup,
  showSettingsDropdown: settings.show,
  showRomanNumerals: settings.showRomanNumerals,
  showNotesInCommon: settings.showNotesInCommon,
  voicingDecorator,
});

const mapDispatchToProps = dispatch => ({
  addKeyPress: k => dispatch(actions.ADD_KEY_PRESS(k)),
  removeKeyPress: k => dispatch(actions.REMOVE_KEY_PRESS(k)),
  changeKey: key => dispatch(actions.CHANGE_KEY(key)),
  addNotes: notes => dispatch(actions.UPDATE_CHORD_BODY(notes)),
  registerChord: chord => dispatch(actions.PLAY_CHORD(chord)),
  toggleAutoVoicing: () => dispatch(actions.TOGGLE_AUTO_VOICING()),
  loadChords: chords => dispatch(actions.LOAD_CHORDS(chords)),
  toggleSettings: () => dispatch(actions.TOGGLE_SETTINGS()),

  toggleRomanNumerals: () => dispatch(actions.TOGGLE_ROMAN_NUMERALS()),
  toggleNotesInCommin: () => dispatch(actions.TOGGLE_NOTES_IN_COMMON()),
  toggleScales: () => dispatch(actions.TOGGLE_SCALES()),
  toggleDeviceSetup: () => dispatch(actions.TOGGLE_DEVICE_SETUP()),

  toggleRootNoteDecorator: () =>
    dispatch(actions.TOGGLE_VOICING_DECORATOR('rootNote')),
  toggleBassNoteDecorator: () =>
    dispatch(actions.TOGGLE_VOICING_DECORATOR('bassNote')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiUi);
