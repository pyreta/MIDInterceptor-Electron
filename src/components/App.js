import React, { Component } from 'react';
import WebMidi from 'webmidi';
import './App.css';
import logStateChange from '../helpers/logStateChange';
import noOpMidiDevice from '../helpers/noOpMidiDevice';
import { defaultdeviceIds } from '../constants';

// components
import Piano from './Piano';
import ChordDisplay from './ChordDisplay';
import ClockDisplay from './ClockDisplay';
import FilterManager from './FilterManager';
import DeviceManager from './DeviceManager';

const components = [
  Piano,
  ClockDisplay,
  FilterManager,
  DeviceManager,
  ChordDisplay
]

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.registeredListeners = [];
  }

  dispatch(stateChangeObject, ignore = true) {
    !ignore && logStateChange(stateChangeObject);
    this.setState(stateChangeObject);
  }

  loadDevices() {
    this.dispatch({
      midiDevice: WebMidi.getInputById(defaultdeviceIds.midiDevice) || noOpMidiDevice,
      dawListener: WebMidi.getInputById(defaultdeviceIds.dawListener) || noOpMidiDevice,
      outputDevice: WebMidi.getOutputById(defaultdeviceIds.outputDevice) || noOpMidiDevice
    });
  }

  setupWebMidiAPI() {
    WebMidi.enable(err => {
      if (err) {
        console.log('WebMidi could not be enabled.', err);
      } else {
        console.log('WebMidi enabled!');
        this.loadDevices();
        this.dispatch({ ready: true })
      }
    });
  }

  componentWillMount() {
    this.setupWebMidiAPI();
  }

  childProps() {
    return ({
      ...this.state,
      dispatch: this.dispatch.bind(this),
      registeredListeners: this.registeredListeners
    })
  }

  renderApp() {
    return (
      <div>
        {components.map((Component, idx) =>
            <Component key={idx} {...this.childProps()} />)}
      </div>
    )
  }

  render() {
    return (
      <div className="App">
      <div onClick={() => console.log(this.state)}>Log State</div>
      {this.state.ready ?
        this.renderApp() :
        <div>Cannot enable Web Midi</div>}
      </div>
    );
  }
}

export default App;
