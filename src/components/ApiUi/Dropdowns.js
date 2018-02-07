import React from 'react';
import { notes } from '../../constants/theory';

const Dropdowns = ({ tonic, mode, scale, ...props }) => (
  <div>
    <select onChange={props.changeKey} value={tonic}>
      {notes.map((note, idx) => (
        <option value={idx} key={idx}>
          {note}
        </option>
      ))}
    </select>
  </div>
)

export default Dropdowns;
