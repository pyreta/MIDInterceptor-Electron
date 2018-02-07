import React from 'react';
import { connect } from 'react-redux';
import Progression from '../../models/Progression';
import MidiDeviceSetup from './MidiDeviceSetup';
import Dropdowns from './Dropdowns';
import ModeRows from './ModeRows';
import actions from '../../actions';


export class ApiUi extends React.Component {
  modes() {
    return this.props.progression
      .last()
      .getScale()
      .get('modes');
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      this.props.addKeyPress(e.keyCode);
      if (e.key === '7') this.props.addNotes({1: 0, 3: 0, 5: 0, 7: 0});
      if (e.key === '4') this.props.addNotes({1: 0, 4: 0, 5: 0 });
      if (e.key === '2') this.props.addNotes({1: 0, 2: 0, 5: 0 });
      if (e.key === '6') this.props.addNotes({1: 0, 3: 0, 5: 0, 6: 0});
      if (e.key === '9') this.props.addNotes({1: 0, 3: 0, 5: 0, 7: 0, 9: 0});
      if (e.key === '1') this.props.addNotes({1: 0, 3: 0, 5: 0, 7: 0, 11: 0});
      if (e.key === '3') this.props.addNotes({1: 0, 3: 0, 5: 0, 7: 0, 13: 0});
    })
    document.addEventListener('keyup', e => {
      this.props.removeKeyPress(e.keyCode);
      this.props.addNotes({1: 0, 3: 0, 5: 0 })
    })
  }

  render() {
    return (
      <div>
        <MidiDeviceSetup />
        <Dropdowns {...this.props} tonic={this.props.tonic}/>
        <ModeRows {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = ({ tonic, progression, devices: { outputDevice } }) => ({
  tonic,
  progression: new Progression(progression),
  playChord: chord => outputDevice.playNote(chord, 1, { velocity: 0.5 }),
  stopChord: chord => outputDevice.stopNote(chord, 1),
});

const mapDispatchToProps = dispatch => ({
  addKeyPress: k => dispatch(actions.ADD_KEY_PRESS(k)),
  removeKeyPress: k => dispatch(actions.REMOVE_KEY_PRESS(k)),
  changeKey: e => dispatch(actions.CHANGE_KEY(parseInt(e.target.value, 10))),
  addNotes: notes => dispatch(actions.UPDATE_CHORD_BODY(notes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiUi);
