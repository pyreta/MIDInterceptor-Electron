import React from 'react';
import deleteKey from '../helpers/deleteKey';


export class ChordDisplay extends React.Component {

  componentWillMount() {
    ['noteon', 'noteoff'].forEach(listenerType => {
      const verb = { noteon: 'add', noteoff: 'delete' }[listenerType];

      [this.props.dawListener, this.props.midiDevice].forEach(device => {
        device.addListener(listenerType, 1, e => (
          this.props.dispatch({ notes: this.notes[verb](e.note) })
        ));
      })
    });
  }

  get notes() {
    return ({
      add: note => ({ ...this.props.notes, [note.number]: note }),
      delete: note => deleteKey(this.props.notes, note.number)
    })
  }

  render() {
    const { notes } = this.props;
    return (
      <div>
        <div style={{fontSize: '50px'}}>
          {notes && Object.keys(notes).map(key => notes[key].name).join(' ')}
        </div>
      </div>
    )
  }
}

export default ChordDisplay