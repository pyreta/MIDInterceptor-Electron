import React, { Component } from 'react';
import WebMidi from 'webmidi';
import './App.css';
import logStateChange from '../helpers/logStateChange';
import noOpMidiDevice from '../helpers/noOpMidiDevice';
import { defaultdeviceIds } from '../constants';
import ProgressionManager from './ProgressionManager';
import actions from '../actions';
import { connect } from 'react-redux';

class App extends Component {
  constructor() {
    super();
    this.state = { currentKey: 'C', mode: 'ionian' };
    this.registeredListeners = [];
  }

  dispatch(stateChangeObject, ignore = true) {
    !ignore && logStateChange(stateChangeObject);
    this.setState(stateChangeObject);
  }

  loadDevices() {
    this.dispatch({
      midiDevice:
        WebMidi.getInputById(defaultdeviceIds.midiDevice) || noOpMidiDevice,
      dawListener:
        WebMidi.getInputById(defaultdeviceIds.dawListener) || noOpMidiDevice,
      outputDevice:
        WebMidi.getOutputById(defaultdeviceIds.outputDevice) || noOpMidiDevice
    });
  }

  setupWebMidiAPI() {
    WebMidi.enable(err => {
      if (err) {
        console.log('WebMidi could not be enabled.', err);
      } else {
        console.log('WebMidi enabled!');
        this.loadDevices();
        this.dispatch({ ready: true });
      }
    });
  }

  componentWillMount() {
    this.setupWebMidiAPI();
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        {this.state.ready ? (
          <div>
            <ProgressionManager />
            <div onClick={this.props.addChord}>addChord</div>
            <div onClick={this.props.newChords}>newChords</div>
          </div>
        ) : (
          <div>Cannot enable Web Midi</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ progression, resolution }) => ({
  progression,
  resolution
});

const mapDispatchToProps = dispatch => ({
  addChord: () => dispatch(actions.ADD_CHORD()),
  newChords: () => dispatch(actions.NEW_CHORDS())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
