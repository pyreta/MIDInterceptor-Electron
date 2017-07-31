import React, { Component } from 'react';
import logo from './logo.svg';
import WebMidi from 'webmidi';
import './App.css';

import listeners, { midiActions } from '../listeners';
import ChordDisplay from './ChordDisplay';
import Playback from './Playback';
import Metronome from './Metronome';
import ClockDisplay from './ClockDisplay';
import DeviceManager from './DeviceManager';
import FilterManager from './FilterManager';
import * as chainableNoteFilters from '../util/chainableNoteFilters';
import logStateChange from '../helpers/logStateChange';
import deleteKey from '../helpers/deleteKey';
import noOpMidiDevice from '../util/noOpMidiDevice';
import { otherListenerTypes, defaultdeviceIds } from '../constants';

const initialState = {
  WebMidi,
  midiDevice: noOpMidiDevice,
  dawListener: noOpMidiDevice,
  outputDevice: noOpMidiDevice,
  notes: {},
  breathcontrollercoarse: 0,
  programchange: 0,
  channelaftertouch: 0,
  recordedEvents: {},
  recording: false,
  selectedFilters: [
    chainableNoteFilters.passThrough,
    chainableNoteFilters.octaveDown,
    chainableNoteFilters.minorSeventhChord,
    chainableNoteFilters.tripleOctave
  ]
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

  syncClock(device) {
    device.addListener('programchange', 1, e => this.dispatch({ programchange: e.value }));
    device.addListener('channelaftertouch', 1, e => this.dispatch({
      channelaftertouch: e.data[1],
      programchange: e.data[1] === 0 ? 0 : this.state.programchange,
      breathcontrollercoarse: e.data[1] === 0 ? 0 : this.state.breathcontrollercoarse,
    }, 'ignore'));
    device.addListener('controlchange', 1, e => {
      e.controller.name === 'breathcontrollercoarse' && this.dispatch({ breathcontrollercoarse: e.value });
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
        this.syncClock(this.state.dawListener);
        this.forceUpdate();
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

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React/Electron</h2>
        </div>
        <p className="App-intro">
          Hello Electron!
        </p>

        <div>
          <div onClick={() => console.log(this.state)}>Log State</div>
          <div>{`${this.state.midiDevice.manufacturer} ${this.state.midiDevice.name} connected`}</div>
          <DeviceManager
            state={this.state}
            inputss={WebMidi.inputs}
            updateDevice={(id, device, type) => this.setDevice(id, device, type)}
          />
          <FilterManager
            state={this.state}
            dispatch={this.dispatch.bind(this)}
          />
          <Playback state={this.state} />
          <ClockDisplay state={this.state} />
          <ChordDisplay notes={this.state.notes} />
          <Metronome clicks={this.state.channelaftertouch} />
        </div>

      </div>
    );
  }
}

export default App;
