import React, { Component } from 'react';
import logo from './logo.svg';
import WebMidi from 'webmidi';
import './App.css';

import ChordDisplay from './ChordDisplay';
import Playback from './Playback';
import Metronome from './Metronome';
import ClockDisplay from './ClockDisplay';
import DeviceManager from './DeviceManager';
import FilterManager from './FilterManager';
import * as filters from '../util/filters';
import * as chainFilters from '../util/chainFilters';
import logStateChange from '../util/logStateChange';
import deleteKey from '../util/deleteKey';
import { listeners, defaultdeviceIds } from '../constants';

const noOpMidiDevice = {
  addListener: () => {},
  removeListener: () => {},
  playNote: () => {},
  stopNote: () => {}
};

const initialState = {
  WebMidi,
  midiDevice: noOpMidiDevice,
  dawListener: noOpMidiDevice,
  outputDevice: noOpMidiDevice,
  currentFilter: filters.majorChord,
  currentNote: '',
  notes: {},
  programchange: 0,
  channelaftertouch: 0,
  breathcontrollercoarse: 0,
  recordedNotes: {
    '1.51.81': ['C3', 'E3', 'G3']
  },
  selectedFilters: [
    chainFilters.passThrough,
    // chainFilters.octaveDown,
    // chainFilters.minorChord,
    // chainFilters.tripleOctave
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
    // !ignore && logStateChange(stateChangeObject);
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
    // listeners.map(listener =>
    //   device.addListener(listener, 1, e => this.state.currentFilter[listener](e, this.state.outputDevice))
    // );
    device.addListener('noteon', 1, e => this.dispatch({ notes: this.notes.add(e.note) }));
    device.addListener('noteoff', 1, e => this.dispatch({ notes: this.notes.delete(e.note) }));
    this.syncClock(device);
    // ----
    device.addListener('noteon', 1, e => {
      const filteredEvents = this.state.selectedFilters.reduce((accum, filter) => filter(accum), {
        [e.note.number]: e
      });
      chainFilters.midiActions.noteon(filteredEvents, this.state.outputDevice);
    });
    // ----
    device.addListener('noteoff', 1, e => {
      const filteredEvents = this.state.selectedFilters.reduce((accum, filter) => filter(accum), {
        [e.note.number]: e
      });
      chainFilters.midiActions.noteoff(filteredEvents, this.state.outputDevice);
    });
    // ----
    device.addListener('pitchbend', 1, e => {
      this.state.outputDevice.sendPitchBend(e.value, 1)
    });
    // ----
    device.addListener('controlchange', 1, e => {
      this.state.outputDevice.sendControlChange(e.controller.name, e.value, 1);
    });
    //TODO make sure to add pitchbend and control change listeners that are chainable. REFACTOR
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
          onFilterChange={filter => this.dispatch({currentFilter: filters[filter]})}
          currentFilter={this.state.currentFilter}
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
