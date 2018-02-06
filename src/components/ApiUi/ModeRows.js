import React from 'react';
import styled from 'styled-components';
import Chord from './Chord';
import Progression from '../../models/Progression';
import { scales } from '../../constants/theory'

const ScaleContainer = styled.div`display: flex;`;
const ModeName = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  padding: 10px;
  color: white;
  background: rgb(33, 37, 43);
`;
const Container = styled.div`
  border-bottom: 1px solid rgb(33, 37, 43);
  display: inline-block;
`;
const ModeRow = ({ playChord, stopChord, keyy, scale, mode }) => (
  <ScaleContainer>
  <ModeName>{scales[scale].modes[mode-1]}</ModeName>
    {Progression.allChords({ key: keyy, scale, mode }).chords()
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
export class ModeRows extends React.Component {
  render() {
    const { playChord, stopChord } = this.props;
    return (
      <Container>
        {[1,2,3,5,6].map((mode) => (
          <ModeRow
            playChord={playChord}
            stopChord={stopChord}
            keyy={0}
            mode={mode}
            key={mode}
            scale={'major'}
          />
        ))}
        {[1,5].map((mode) => (
          <ModeRow
            playChord={playChord}
            stopChord={stopChord}
            keyy={0}
            mode={mode}
            key={mode}
            scale={'harmonicMinor'}
          />
        ))}
      </Container>
    );
  }
}

export default ModeRows;
