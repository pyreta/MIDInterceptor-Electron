import React from 'react';
import { notes } from '../constants';
import { mapMajor } from '../constants/scales';

const KeySelect = ({ updateKey, currentKey }) =>
  <div>
    <select onChange={(e) => updateKey(e.target.value)} value={currentKey}>
      {notes.map((note, idx) =>
      <option value={note} key={idx}>{note}</option>)}
    </select>
  </div>

const ModeSelect = ({ updateMode, currentMode }) =>
  <div>
    <select onChange={(e) => updateMode(e.target.value)} value={currentMode}>
      {Object.keys(mapMajor.to).map((mode, idx) =>
      <option value={mode} key={idx}>{mode}</option>)}
    </select>
  </div>

export class KeyManager extends React.Component {

  componentWillMount() {

  }

  render() {
    return (
      <div>
        <div>Song Key</div>
        <KeySelect currentKey={this.props.currentKey} updateKey={currentKey => this.props.dispatch({ currentKey })} />
        <div>Mode</div>
        <ModeSelect currentMode={this.props.currentMode} updateMode={mode => this.props.dispatch({ mode })} />
      </div>
    )
  }
}

export default KeyManager;
