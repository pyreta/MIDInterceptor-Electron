import React from 'react';
import deleteKey from '../helpers/deleteKey';
import WebMidi from 'webmidi';


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
        this.props.setNotes(this.notes[verb](e.note));
      });
    })
  }

  get notes() {
    return ({
      add: note => ({ ...this.props.notes, [note.number]: note }),
      delete: note => deleteKey(this.props.notes, note.number)
    })
  }

  render() {
    const { notes = {}, xfilteredNotes = {} } = this.props;
    return (
      <div>
        <div style={{fontSize: '50px', color: 'rgb(229, 192, 123)'}}>
          {(Object.keys(notes).map(key => notes[key].name).join(' ') || '-')}
        </div>
        <div style={{fontSize: '50px', color: '#98c379'}}>
          {(Object.keys(xfilteredNotes).map(key => WebMidi['_notes'][xfilteredNotes[key].note.number % 12]).join(' ') || '-')}
        </div>
      </div>
    )
  }
}

export default ChordDisplay
