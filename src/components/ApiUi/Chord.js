import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import _ from 'lodash';
import ChordModel from '../../models/Chord';
import RomanNumeral from './RomanNumeral';

const Name = styled.div`
  font-size: 12px;
`;

const NameNoRoman = styled.div`
  font-size: 15px;
`;

const Container = styled.div`
  border: 1px solid rgb(33, 37, 43);
  padding: 13px;
  width: 50px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 0;
  border-bottom: 0;
  color: rgb(33, 37, 43);
  user-select: none;
  transition: all 200ms ease;
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
const allNotes = [...Array(124).keys()];
const Chord = ({
  chord,
  onClick,
  onStop,
  i,
  lastPlayedChord,
  autoVoicing,
  voicingDecorator: decorator,
  isInverted,
  showRomanNumerals,
}) => {
  const lastPlayedNotes = lastPlayedChord.noteNames();
  let voicingDecorator = decorator;
  if (voicingDecorator === 'rootNote' && isInverted)
    voicingDecorator = 'bassNote';
  const notes = chord.decorate[voicingDecorator]()
    .voicing()
    .noteValues();
  const notesInCommon = _.intersection(lastPlayedNotes, chord.noteNames())
    .length;
  return (
    <Container
      onMouseDown={() => {
        // console.log(`played notes:`, notes)
        onClick(notes, chord.unwrap());
      }}
      onMouseUp={() => onStop(allNotes)}
      notesInCommon={notesInCommon > 3 ? 9 : notesInCommon * 3}
    >
      {showRomanNumerals && <RomanNumeral
        {...chord.romanNumeralAnalysis()}
        showInversion={voicingDecorator !== 'rootNote'}
      />}
      {showRomanNumerals ?
        <Name>
        {chord.name({ showInversion: voicingDecorator !== 'rootNote' })}
      </Name> :
        <NameNoRoman>
        {chord.name({ showInversion: voicingDecorator !== 'rootNote' })}
      </NameNoRoman>
    }
    </Container>
  );
};

const mapStateToProps = ({
  lastPlayedChord,
  autoVoicing,
  voicingDecorator,
  showRomanNumerals,
}) => ({
  lastPlayedChord: lastPlayedChord.notes
    ? new ChordModel(lastPlayedChord)
    : new ChordModel(lastPlayedChord),
  autoVoicing,
  voicingDecorator,
  showRomanNumerals,
});

export default connect(mapStateToProps)(Chord);
