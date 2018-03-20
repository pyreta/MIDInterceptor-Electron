import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Chord from './Chord';
import Progression from '../../models/Progression';
import ChordModel from '../../models/Chord';
import actions from '../../actions';

const ScaleContainer = styled.div`
  display: flex;
`;

const ModeName = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-family: sans-serif;
  color: rgba(141, 152, 169, 0.9);
  background: rgb(33, 37, 43);
  font-size: 13px;
`;

const Container = styled.div`
  border-bottom: 1px solid rgb(33, 37, 43);
  display: inline-block;
`;

// window.loadedChords = [[]];
window.modeRow = 0;
const setLoadedChord = chord => {
  const lastRow = window.loadedChords[window.loadedChords.length - 1];
  lastRow.length < 7 ? lastRow.push(chord) : window.loadedChords.push([chord]);
};

const ModeRow = ({
  playChord,
  stopChord,
  tonic,
  scale,
  mode,
  chordBody: notes,
  secondaryDominants,
  inversion,
  secondary,
  autoVoicing,
  lastPlayedChord,
}) => {
  const progression = Progression.allChords(
    {
      key: tonic,
      scale,
      mode,
      notes,
    },
    secondaryDominants,
  ).setInversion(inversion);


  return (
    <ScaleContainer>
      <ModeName>
        {progression
          .last()
          .getMode()
          .name()}
      </ModeName>
      {progression.chords().map((c, i) => {
        const voicedChord =
          autoVoicing && (inversion < 1)
            ? c.secondary(secondary).matchVoicingToChord(lastPlayedChord, 'bijective')
            : c.secondary(secondary).matchOctaveToChord(lastPlayedChord);

        setLoadedChord(voicedChord);
        return (
          <Chord
            key={i}
            chord={voicedChord}
            i={i}
            onClick={playChord}
            onStop={stopChord}
            isInverted={!!inversion}
          />
        );
      })}
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
    const {
      modeRows,
      stopChord,
      tonic,
      chordBody,
      secondaryDominants,
      autoVoicing,
      lastPlayedChord,
    } = this.props;
    window.loadedChords = [[]];
    return (
      <Container>
        {Object.keys(modeRows).map(scale =>
          Object.keys(modeRows[scale])
            .filter(mode => modeRows[scale][mode])
            .map(mode => (
              <ModeRow
                inversion={this.props.inversion}
                secondary={this.props.secondary}
                playChord={this.playChord}
                stopChord={stopChord}
                tonic={tonic}
                mode={mode}
                key={mode}
                scale={scale}
                chordBody={chordBody}
                autoVoicing={autoVoicing}
                lastPlayedChord={lastPlayedChord}
                secondaryDominants={secondaryDominants}
              />
            )),
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({
  modeRows,
  keysPressed,
  chordBody,
  autoVoicing,
  lastPlayedChord,
  devices: { outputDevice },
  tonic,
}) => ({
  tonic,
  chordBody,
  autoVoicing,
  lastPlayedChord: new ChordModel(lastPlayedChord),
  stopChord: chord => outputDevice.stopNote(chord, 1),
  playChord: chord => outputDevice.playNote(chord, 1, { velocity: 0.7 }),
  secondaryDominants: keysPressed['83'],
  modeRows,
});

const mapDispatchToProps = dispatch => ({
  registerChord: chord => dispatch(actions.PLAY_CHORD(chord)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeRows);
