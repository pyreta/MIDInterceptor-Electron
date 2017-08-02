import React, { Component } from 'react';
import WebMidi from 'webmidi';
import './App.css';
import logStateChange from '../helpers/logStateChange';
import noOpMidiDevice from '../helpers/noOpMidiDevice';
import { defaultdeviceIds } from '../constants';

// components
import ChordDisplay from './ChordDisplay';
import ClockDisplay from './ClockDisplay';
import FilterManager from './FilterManager';

const components = [
  ClockDisplay,
  FilterManager,
  ChordDisplay
]

class App extends Component {
  constructor() {
    super();
    this.state = { ready: false };
  }

  dispatch(stateChangeObject, ignore) {
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

  getDevice(id, type) {
    return WebMidi[`get${type[0].toUpperCase()}${type.slice(1)}ById`](id);
  }

  setDevice(id, device, type = 'input') {
    const newDevice = this.getDevice(id, type);
    if (type === 'input' ) {
      type === 'input' && this.addListeners(newDevice);
      this.state[device].removeListener();
    }
    const deviceIds = { ...defaultdeviceIds, [device]: id }
    this.dispatch({
      [device]: newDevice,
      defaultdeviceIds: deviceIds
    })
  }

  childProps() {
    return ({
      ...this.state,
      dispatch: this.dispatch.bind(this),
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
