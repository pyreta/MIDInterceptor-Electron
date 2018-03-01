import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import _ from 'lodash';
import ChordModel from '../../models/Chord';
import RomanNumeral from './RomanNumeral';

// const RomanNumeral = styled.div`
//   font-size: 19px;
//   font-family: times;
//   font-weight: bold;
// `;

const Name = styled.div`
  font-size: 12px;
`;

const Container = styled.div`
  border: 1px solid rgb(33, 37, 43);
  padding: 13px;
  width: 50px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 0;
  border-bottom: 0;
  color: rgb(33, 37, 43);
  transition: all 0.2s ease;
  background: rgba(43, 123, 245, 0.${({ notesInCommon }) => notesInCommon});
  &:hover {
    background: rgb(33, 37, 43);
    color: white;
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 3px 3px 20px 1px #ccc;
  }
  &:active {
    color: rgb(33, 37, 43);
    width: 44px;
    transform: scale(1.4);
    height: 34px;
    border: 3px solid rgb(33, 37, 43);
    background: rgb(216, 0, 0);
  }
`;


const Chord = ({ chord, onClick, onStop, i, lastPlayedChord, autoVoicing }) => {
  const lastPlayedNotes = lastPlayedChord.noteNames();
  //  TODO make this auto voice or auto octave or somet shit.  Rite now autovoicing is always false
  const voicedChord = autoVoicing ? chord.matchVoicingToChord(lastPlayedChord) : chord.matchOctaveToChord(lastPlayedChord);
  const notes = voicedChord.voicing().noteValues();
  const notesInCommon = _.intersection(lastPlayedNotes, chord.noteNames()).length;
  return (
    <Container
      onMouseDown={() => onClick(notes, voicedChord.unwrap())}
      onMouseUp={() => onStop(notes)}
      notesInCommon={notesInCommon > 3 ? 9 : notesInCommon * 3}
    >
      {
        // <RomanNumeral>{chord.romanNumeral()}</RomanNumeral>
      }
      <RomanNumeral {...chord.romanNumeralAnalysis()} />
      <Name>{chord.name()}</Name>
    </Container>
  )
};

const mapStateToProps = ({ lastPlayedChord, autoVoicing }) => ({
  lastPlayedChord: lastPlayedChord.notes ? new ChordModel(lastPlayedChord) : new ChordModel(lastPlayedChord),
  autoVoicing,
})

export default connect(mapStateToProps)(Chord);
