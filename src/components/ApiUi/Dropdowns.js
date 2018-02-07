import React from 'react';
import scales from '../../constants/scales';
import { notes } from '../../constants/theory';

const Dropdowns = ({ tonic, mode, scale, ...props }) => (
  <div>
    <select onChange={props.changeScale} value={scale}>
      {Object.keys(scales).map(scale => (
        <option value={scale} key={scale}>
          {scales[scale].name}
        </option>
      ))}
    </select>
    <select onChange={props.changeKey} value={tonic}>
      {notes.map((note, idx) => (
        <option value={idx} key={idx}>
          {note}
        </option>
      ))}
    </select>
    <select onChange={props.changeMode} value={mode}>
      {props.progression.last().getScale().get('modes').map((mode, idx) => (
        <option value={idx + 1} key={idx}>
          {mode}
        </option>
      ))}
    </select>
  </div>
)

export default Dropdowns;
