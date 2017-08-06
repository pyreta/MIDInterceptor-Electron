import React, { Component } from 'react';
import WebMidi from 'webmidi';
import './App.css';
import logStateChange from '../helpers/logStateChange';
import noOpMidiDevice from '../helpers/noOpMidiDevice';
import DualCanvasPiano from '../canvas/DualCanvasPiano';
import { defaultdeviceIds } from '../constants';

// components
// import { PianoIn, PianoOut } from './Piano';
import ChordDisplay from './ChordDisplay';
import ClockDisplay from './ClockDisplay';
import FilterManager from './FilterManager';
import DeviceManager from './DeviceManager';

const components = [
  // PianoIn,
  // PianoOut,
  ClockDisplay,
  FilterManager,
  DeviceManager,
  ChordDisplay
]

class App extends Component {
  constructor() {
    super();
    this.canvas = document.getElementById('canvas');
    this.canvas.width = 1160;
    this.canvas.height = 500;
    this.ctx = this.canvas.getContext('2d');
    this.dualCanvasPiano = new DualCanvasPiano(this.ctx, { octaves: 4, x: 20, y: 20 });
    this.state = {};
    this.registeredListeners = [];
    this.xnotes = {};
    this.xfilteredNotes = {};
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
    this.dualCanvasPiano.draw({
      heldNotes: { 'C#1': true, 'D2': true },
      heldFilterNotes: { 'C#2': true, 'D3': true, 'F3': true, 'F#3': true },
    });
  }

  setXnotes(thing) {
    this.xnotes = thing;
    this.forceUpdate();
  }

  setFilteredNotes(thing) {
    this.xfilteredNotes = thing;
  }

  deleteNote(num) {
    delete this.xfilteredNotes[num];
  }

  childProps() {
    return ({
      ...this.state,
      dispatch: this.dispatch.bind(this),
      registeredListeners: this.registeredListeners,
      xnotes: this.xnotes,
      setXnotes: this.setXnotes.bind(this),
      xfilteredNotes: this.xfilteredNotes,
      setFilteredNotes: this.setFilteredNotes.bind(this),
      deleteNote: this.deleteNote.bind(this),
      showNotes: true,
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
      {this.state.ready ?
        this.renderApp() :
        <div>Cannot enable Web Midi</div>}
        <div onClick={() => console.log(this.state)}>Log State</div><br />
        <div onClick={() => console.log(this.childProps())}>Log childProps</div>
      </div>
    );
  }
}

export default App;
