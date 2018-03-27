import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from '../../actions';

// prettier-ignore
const Button = styled.div`
  background: ${({ on }) => (on ? 'rgba(245, 43, 43, 0.9)' : 'white')};
  ${({ on }) =>
    on
      ? 'box-shadow: 0px 0px 14px 5px rgba(245, 43, 43, 0.4);'
      : 'box-shadow: 1px 1px 5px rgba(0,0,0,0.6);'}
  height: 29px;
  text-align: center;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 2px;
  font-size: 11px;
  border: 1px solid #21252b;
  user-select: none;
  cursor: pointer;
  margin: 0 0 4px 5px;
  transition: all 40ms ease-out;
  transition: background 200ms ease-out;
  flex: 1;
  &:active {
    font-size: 10px;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.9);
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin-left: -5px;
`;

class Buttons extends React.Component {
  constructor() {
    super();
    this.toggleSeventh = this.toggleSeventh.bind(this);
    this.toggleSixth = this.toggleSixth.bind(this);
  }

  toggleSeventh() {
    const notes = { 1: 0, 3: 0, 5: 0 };
    if (!(this.props.chordBody[7] === 0)) {
      notes[7] = 0;
    }
    this.props.addNotes(notes);
  }

  toggleSixth() {
    const notes = { 1: 0, 3: 0, 5: 0 };
    if (!(this.props.chordBody[6] === 0)) {
      notes[6] = 0;
    }
    this.props.addNotes(notes);
  }

  render() {
    return (
      <Wrapper>
        <Button
          on={this.props.autoVoicing}
          onClick={this.props.toggleAutoVoicing}
        >
          Auto Voicing
        </Button>
        <Button
          on={
            this.props.voicingDecorator === 'rootNote' && !this.props.isInverted
          }
          onClick={this.props.toggleRootNoteDecorator}
        >
          Root Note
        </Button>
        <Button
          on={
            this.props.voicingDecorator === 'bassNote' ||
            (this.props.voicingDecorator === 'rootNote' &&
              this.props.isInverted)
          }
          onClick={this.props.toggleBassNoteDecorator}
        >
          Bass Note
        </Button>
        <Button
          on={this.props.showRomanNumerals}
          onClick={this.props.toggleRomanNumerals}
        >
          Roman
        </Button>
        <Button
          on={this.props.showNotesInCommon}
          onClick={this.props.toggleNotesInCommin}
        >
          Common Notes
        </Button>
        <Button on={this.props.showScales} onClick={this.props.toggleScales}>
          Show Scales
        </Button>
        <Button
          on={this.props.showDeviceSetup}
          onClick={this.props.toggleDeviceSetup}
        >
          Devices
        </Button>
        <Button on={this.props.chordBody[6] === 0} onClick={this.toggleSixth}>
          Sixth
        </Button>
        <Button on={this.props.chordBody[7] === 0} onClick={this.toggleSeventh}>
          Seventh
        </Button>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  autoVoicing,
  voicingDecorator,
  chordBody,
  settings,
}) => ({
  autoVoicing,
  voicingDecorator,
  chordBody,
  showRomanNumerals: settings.showRomanNumerals,
  showNotesInCommon: settings.showNotesInCommon,
  showScales: settings.showScales,
  showDeviceSetup: settings.showDeviceSetup,
});

const mapDispatchToProps = dispatch => ({
  toggleAutoVoicing: () => dispatch(actions.TOGGLE_AUTO_VOICING()),
  toggleRootNoteDecorator: () =>
    dispatch(actions.TOGGLE_VOICING_DECORATOR('rootNote')),
  toggleBassNoteDecorator: () =>
    dispatch(actions.TOGGLE_VOICING_DECORATOR('bassNote')),
  addNotes: notes => dispatch(actions.UPDATE_CHORD_BODY(notes)),
  toggleRomanNumerals: () => dispatch(actions.TOGGLE_ROMAN_NUMERALS()),
  toggleNotesInCommin: () => dispatch(actions.TOGGLE_NOTES_IN_COMMON()),
  toggleScales: () => dispatch(actions.TOGGLE_SCALES()),
  toggleDeviceSetup: () => dispatch(actions.TOGGLE_DEVICE_SETUP()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
