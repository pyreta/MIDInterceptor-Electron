import React, { Component } from 'react';
import WebMidi from 'webmidi';
import './App.css';
import listeners, { midiActions } from '../listeners';
import ChordDisplay from './ChordDisplay';
import ClockDisplay from './ClockDisplay';
import logStateChange from '../helpers/logStateChange';
import deleteKey from '../helpers/deleteKey';
import noOpMidiDevice from '../util/noOpMidiDevice';
import { otherListenerTypes, defaultdeviceIds } from '../constants';

const initialState = {
  notes: {},
  ready: false,
  midiDevice: noOpMidiDevice,
  dawListener: noOpMidiDevice,
  outputDevice: noOpMidiDevice,
  selectedFilters: []
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  get notes() {
    return ({
      add: note => ({ ...this.state.notes, [note.number]: note }),
      delete: note => deleteKey(this.state.notes, note.number)
    })
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

  addListeners(device) {
    // ---- Add Note on and Note off Listeners
    ['noteon', 'noteoff'].forEach(listenerType =>
      device.addListener(listenerType, 1, e => (
        listeners.forEach(listener => listener[listenerType](e, this))
      )));
    // ---- Add Other Listeners
    otherListenerTypes.forEach(listenerType =>
      device.addListener(listenerType, 1, e => midiActions[listenerType](e, this.state.outputDevice)
    ))
  }

  setupWebMidiAPI() {
    WebMidi.enable(err => {
      if (err) {
        console.log('WebMidi could not be enabled.', err);
      } else {
        console.log('WebMidi enabled!');
        this.loadDevices();
        this.addListeners(this.state.dawListener);
        this.addListeners(this.state.midiDevice);
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
      dispatch: this.dispatch.bind(this)
    })
  }

  renderApp() {
    return (
      <div>
        <div onClick={() => console.log(this.state)}>Log State</div>
        <ClockDisplay {...this.childProps()} />
        <ChordDisplay notes={this.state.notes} />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
      {this.state.ready ?
        this.renderApp() :
        <div>Cannot enable Web Midi</div>}
      </div>
    );
  }
}

export default App;
