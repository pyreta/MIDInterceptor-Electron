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
  height: 60px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 0;
  border-bottom: 0;
  color: rgb(33, 37, 43);
  user-select: none;
  transition: all 100ms ease;
  transition: box-shadow 400ms ease;
  background: rgba(43, 123, 245, 0.${({ notesInCommon, showNotesInCommon }) => showNotesInCommon ? notesInCommon : 2 });
  &:hover {
    background: rgb(33, 37, 43);
    color: white;
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 3px 3px 20px 1px #ccc;
  }
  &:active {
    color: rgb(33, 37, 43);
    transform: scale(1.2);
    background: rgb(216, 0, 0);
  }
`;

const probabilityStyle = (probability, functional) => {
  let pixels = Math.floor(probability * 60);
  if (pixels < 5 && functional) pixels = 7;
  if (probability > 0 && probability < 0.01) pixels = 1;
  return { boxShadow: `inset 0px -${pixels * 2}px 0px 0px #3c8aff`}
}

const empty = {};

const allNotes = [...Array(124).keys()];
const Chord = ({
  chord,
  onClick,
  onStop,
  lastPlayedChord,
  autoVoicing,
  voicingDecorator: decorator,
  isInverted,
  showRomanNumerals,
  showNotesInCommon,
}) => {
  const lastPlayedNotes = lastPlayedChord.noteNames();
  let voicingDecorator = decorator;
  if (voicingDecorator === 'rootNote' && isInverted)
    voicingDecorator = 'bassNote';
  const decoratedChord = chord.decorate[voicingDecorator]();
  const notes = decoratedChord.voicing().noteValues();
  const notesInCommon = _.intersection(lastPlayedNotes, chord.noteNames())
    .length;
  const percentNextChord = lastPlayedChord.nextChordProbability(decoratedChord, { showInversion: voicingDecorator !== 'rootNote' });
  const style = lastPlayedChord ? probabilityStyle(percentNextChord, lastPlayedChord.isGoodNextChord(decoratedChord)) : empty;
  return (
    <Container
      onMouseDown={() => {
        // console.log(`played notes:`, notes)
        onClick(notes, chord.unwrap());
      }}
      onMouseUp={() => onStop(allNotes)}
      showNotesInCommon={showNotesInCommon}
      notesInCommon={notesInCommon > 3 ? 9 : notesInCommon * 3}
      style={style}
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
  settings,
}) => ({
  lastPlayedChord: new ChordModel(lastPlayedChord),
  autoVoicing,
  voicingDecorator,
  showRomanNumerals: settings.showRomanNumerals,
  showNotesInCommon: settings.showNotesInCommon,
});

export default connect(mapStateToProps)(Chord);
