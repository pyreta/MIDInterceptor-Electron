import React from 'react';
import styled from 'styled-components';

const RomanNumeral = styled.div`
  font-size: 35px;
  font-family: times;
  font-weight: bold;
`;

const Container = styled.div`
  border: 1px solid rgb(33, 37, 43);
  padding: 30px;
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 0;
  color: rgb(33, 37, 43);
  transition: all 0.2s ease;
  &:hover {
    background: rgb(33, 37, 43);
    color: white;
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 3px 3px 20px 1px #ccc;
  }
  &:active {
    color: rgb(33, 37, 43);
    border: 3px solid rgb(33, 37, 43);
    background: rgb(216, 0, 0);
  }
`;
const Chord = ({ chord, onClick, i }) => (
  <Container onMouseDown={() => onClick(chord.noteValues().map(x => x + 60))}>
    <RomanNumeral>
      {chord.romanNumeral()}
    </RomanNumeral>
    <div>
      {chord.name()}
    </div>
  </Container>
);

export default Chord;

// <div>
// <div><span style={{
//   fontSize: '25px',
//   fontFamily: 'times',
//   fontWeight: 'bold',
// }}>{chord.romanNumeral()}</span>{'  ------- ' + chord.name() + ' - ' + chord.noteNames().join(' ')}
// </div>
// {'   2'}
// <input onChange={({target: t}) => {
//   onClick(2, 0, t.checked, i);
//   onClick(3, 0, !t.checked, i);
// }} type="checkbox" value={2} />
// {'   4'}
// <input onChange={({target: t}) => {
//   onClick(4, 0, t.checked, i);
//   onClick(3, 0, !t.checked, i);
// }} type="checkbox" value={4} />
// {'   ♭5'}
// <input onChange={({target: t}) => onClick(5, -1, t.checked, i)} type="checkbox" value={5} />
// {'   7'}
// <input onChange={({target: t}) => onClick(7, 0, t.checked, i)} type="checkbox" value={7} />
// {'   9'}
// <input onChange={({target: t}) => onClick(9, 0, t.checked, i)} type="checkbox" value={9} />
// </div>
