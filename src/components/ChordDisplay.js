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

  findNoteFromNumber(number) {
    // console.log(`jhgjhg`, `${WebMidi['_notes'][number % 12]}1`)
    return `${WebMidi['_notes'][number % 12]}${Math.floor(number/12)-2}`;
  }

  connectListener(device) {
    ['noteon', 'noteoff'].forEach(listenerType => {
      const verb = { noteon: 'add', noteoff: 'delete' }[listenerType];
      device.addListener(listenerType, 1, e => {
        this.props.setXnotes(this.xnotes[verb](e.note));

        const heldNotes = { 'C#2': true, 'C#3': true, 'F3': true, 'C#1': true, 'C#4': true, 'F1': true}
        // const heldNotes = Object.values(this.props.xnotes).reduce((accum, event) => {
        //   accum[`${event.name}${event.octave+2}`] = true;
        //   return accum;
        // }, {});
        this.props.canvasPiano.draw({
          x: 35,
          y: 20,
          heldNotes,
        })

        // const heldFilteredNotes = Object.keys(this.props.xfilteredNotes).reduce((accum, noteNum) => {
        //   accum[this.findNoteFromNumber(noteNum)] = true;
        //   return accum;
        // }, {});
        // this.props.canvasPianoOut.draw({
        //   x: 35,
        //   y: 250,
        //   heldNotes: heldFilteredNotes,
        // })


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
