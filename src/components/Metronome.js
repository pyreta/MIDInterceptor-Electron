import React from 'react';

const Metronome = props => {
  const quarter = props.clicks % 16 === 0;
  const eighth = props.clicks % 8 === 0;
  const whole = props.clicks % 64 === 0;
  let label = ''
  if (whole) {
    label = 'BEEP'
  } else if (quarter) {
    label = 'boop'
  } else if (eighth) {
    label = ''
  }
  return <div style={{fontSize: '40px', color: 'red'}}>{label}</div>
}

export default Metronome;
