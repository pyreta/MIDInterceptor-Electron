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
        // console.log(`this.xnotes[verb](e.note):`, this.xnotes[verb](e.note))
        this.props.setXnotes(this.xnotes[verb](e.note));
        // this.props.dispatch({ notes: this.notes[verb](e.note) });
      });
    })
  }

  get notes() {
    return ({
      add: note => ({ ...this.props.notes, [note.number]: note }),
      delete: note => deleteKey(this.props.notes, note.number)
    })
  }

  get xnotes() {
    return ({
      add: note => ({ ...this.props.xnotes, [note.number]: note }),
      delete: note => deleteKey(this.props.xnotes, note.number)
    })
  }

  render() {
    const { xnotes = {}, xfilteredNotes = {} } = this.props;
    return (
      <div>
        <div style={{fontSize: '50px', color: 'rgb(229, 192, 123)'}}>
          {(Object.keys(xnotes).map(key => xnotes[key].name).join(' ') || '-')}
        </div>
        <div style={{fontSize: '50px', color: '#98c379'}}>
          {(Object.keys(xfilteredNotes).map(key => WebMidi['_notes'][xfilteredNotes[key].note.number % 12]).join(' ') || '-')}
        </div>
      </div>
    )
  }
}

export default ChordDisplay
