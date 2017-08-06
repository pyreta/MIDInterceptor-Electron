import React, { Component } from 'react';
import WebMidi from 'webmidi';
import './App.css';
import logStateChange from '../helpers/logStateChange';
import noOpMidiDevice from '../helpers/noOpMidiDevice';
import CanvasPiano from '../canvas/CanvasPiano';
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
    this.canvasPiano = new CanvasPiano(this.ctx, {
      octaves: 4,
      // keyBorderRadius: 0,
      // keyBorderWidth: 1,
      // whiteKeyWidth: 50,
      // blackKeyWidth: 35,
      // blackKeyHeight: 170,
      // whiteKeyFontSize: 26,
      // blackKeyFontSize: 10,
      // font: 'Arial',
      // whiteKeyHeight: 270,
      // colors: { whiteKey: 'yellow', blackKey: 'blue', blackKeyBorder: 'black', keyHold: 'green' }
    })
    this.canvasPianoOut = new CanvasPiano(this.ctx, {
      octaves: 4,
      // keyBorderRadius: 0,
      // keyBorderWidth: 1,
      // whiteKeyWidth: 50,
      // blackKeyWidth: 35,
      // blackKeyHeight: 170,
      // whiteKeyFontSize: 26,
      // blackKeyFontSize: 10,
      // font: 'Arial',
      // whiteKeyHeight: 270,
      colors: { whiteKey: '#98c379'}
    })
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
    this.canvasPiano.draw({
      x: 35,
      y: 20,
      heldNotes: {},
      // heldNotes: {'A1': true, 'G2': true, 'D#1': true, 'C#4': true, 'D4': true},
    });
    this.canvasPianoOut.draw({
      x: 35,
      y: 250,
      heldNotes: {},
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
      canvasPiano: this.canvasPiano,
      canvasPianoOut: this.canvasPianoOut
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
