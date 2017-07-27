import React from 'react';

const ChordDisplay = ({ notes }) =>
  <div>
    <div style={{fontSize: '50px'}}>
      {Object.keys(notes).map(key => notes[key].name).join(' ')}
    </div>
  </div>

export default ChordDisplay;
