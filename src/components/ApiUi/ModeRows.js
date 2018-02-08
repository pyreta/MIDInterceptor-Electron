import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Chord from './Chord';
import Progression from '../../models/Progression';
import actions from '../../actions';

const ScaleContainer = styled.div`display: flex;`;
const ModeName = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-family: sans-serif;
  color: rgba(141, 152, 169, 0.9);
  background: rgb(33,37,43);
  font-size: 13px;
`;
const Container = styled.div`
  border-bottom: 1px solid rgb(33, 37, 43);
  display: inline-block;
`;
const ModeRow = ({
  playChord,
  stopChord,
  tonic,
  scale,
  mode,
  chordBody: notes,
}) => {
  const progression = Progression.allChords({ key: tonic, scale, mode, notes });
  return (
    <ScaleContainer>
      <ModeName>{progression.last().getMode().name()}</ModeName>
      {progression
        .chords()
        .map((c, i) => (
          <Chord
            key={i}
            chord={c}
            i={i}
            onClick={playChord}
            onStop={stopChord}
          />
        ))}
    </ScaleContainer>
  );
};
export class ModeRows extends React.Component {
  constructor() {
    super();
    this.playChord = this.playChord.bind(this);
  }
  playChord(notes, chord) {
    this.props.playChord(notes);
    this.props.registerChord(chord);
  }

  render() {
    const { stopChord, tonic, chordBody } = this.props;
    return (
      <Container>
        {[1, 6, 2, 3, 5, 7, 4].map(mode => (
          <ModeRow
            playChord={this.playChord}
            stopChord={stopChord}
            tonic={tonic}
            mode={mode}
            key={mode}
            scale={'major'}
            chordBody={chordBody}
          />
        ))}
        {[1, 5].map(mode => (
          <ModeRow
            playChord={this.playChord}
            stopChord={stopChord}
            tonic={tonic}
            mode={mode}
            key={mode}
            scale={'harmonicMinor'}
            chordBody={chordBody}
          />
        ))}
      </Container>
    );
  }
}

const mapStateToProps = ({ chordBody, devices: { outputDevice }, tonic }) => ({
  tonic,
  chordBody,
  stopChord: chord => outputDevice.stopNote(chord, 1),
  playChord: chord => outputDevice.playNote(chord, 1, { velocity: 0.5 }),
});

const mapDispatchToProps = dispatch => ({
  registerChord: chord => dispatch(actions.PLAY_CHORD(chord)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeRows);
