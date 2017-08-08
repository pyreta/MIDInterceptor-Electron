import React from 'react';
import deleteKey from '../helpers/deleteKey';
import { PianoOut } from './Piano';

export class ChordDisplay extends React.Component {

  componentWillMount() {
    [this.props.dawListener, this.props.midiDevice].forEach(
      this.connectListener.bind(this)
    );
    this.props.registeredListeners.push(this.connectListener.bind(this));
  }

  connectListener(device) {
    ['noteon', 'noteoff'].forEach(listenerType => {
      const verb = { noteon: 'add', noteoff: 'delete' }[listenerType];
      device.addListener(listenerType, 1, e => {
        this.props.setNotes(this.notes[verb](e));
      });
    })
  }

  get notes() {
    return ({
      add: e => ({ ...this.props.notes, [e.note.number]: e }),
      delete: e => deleteKey(this.props.notes, e.note.number)
    })
  }

  render() {
    const { notes, filteredNotes } = this.props;
    return (
      <div>
        <PianoOut {...this.props} />
        <div style={{fontSize: '50px', color: 'rgb(229, 192, 123)'}}>
          {(Object.values(notes).map(e => e.note.name).join(' ') || '-')}
        </div>
        <div style={{fontSize: '50px', color: '#98c379'}}>
          {(Object.values(filteredNotes).map(e => e.note.name).join(' ') || '-')}
        </div>
      </div>
    )
  }
}

export default ChordDisplay
