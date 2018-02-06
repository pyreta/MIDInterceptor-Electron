import React from 'react';
import { connect } from 'react-redux';
import Progression from '../../models/Progression';
import scales from '../../constants/scales';
import { notes } from '../../constants/theory';
import styled from 'styled-components';
import Chord from './Chord';
import MidiDeviceSetup from './MidiDeviceSetup';

const ChordContainer = styled.div`display: flex;`;

export class ApiUi extends React.Component {
  modes() {
    return this.props.progression
      .last()
      .getScale()
      .get('modes');
  }
  render() {
    const { key, mode, scale } = this.props.progression.last().data();
    return (
      <div>
        <MidiDeviceSetup />
        <select onChange={this.props.changeScale} value={scale}>
          {Object.keys(scales).map(scale => (
            <option value={scale} key={scale}>
              {scales[scale].name}
            </option>
          ))}
        </select>
        <select onChange={this.props.changeKey} value={key}>
          {notes.map((note, idx) => (
            <option value={idx} key={idx}>
              {note}
            </option>
          ))}
        </select>
        <select onChange={this.props.changeMode} value={mode}>
          {this.modes().map((mode, idx) => (
            <option value={idx + 1} key={idx}>
              {mode}
            </option>
          ))}
        </select>
        <br />
        <ChordContainer>
          {this.props.progression
            .chords()
            .map((c, i) => (
              <Chord key={i} chord={c} i={i} onClick={this.props.playChord} />
            ))}
        </ChordContainer>
      </div>
    );
  }
}

const mapStateToProps = ({ progression, devices: { outputDevice } }) => ({
  progression: new Progression(progression),
  playChord: chord => outputDevice.playNote(chord, 1, { velocity: 0.35 })
});

const mapDispatchToProps = dispatch => ({
  changeScale: e => dispatch({ type: 'CHANGE_SCALE', payload: e.target.value }),
  changeKey: e => dispatch({ type: 'CHANGE_KEY', payload: e.target.value }),
  changeMode: e => dispatch({ type: 'CHANGE_MODE', payload: e.target.value }),
  adjustChord: (interval, value, on, idx) =>
    dispatch({ type: 'ADJUST_CHORD', payload: { interval, value, on, idx } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiUi);
