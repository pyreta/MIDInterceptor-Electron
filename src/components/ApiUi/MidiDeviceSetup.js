import React, { Component } from 'react';
import WebMidi from 'webmidi';
import noOpMidiDevice from '../../helpers/noOpMidiDevice';
import { defaultdeviceIds } from '../../constants';
import actions from '../../actions';
import { connect } from 'react-redux';

class MidiDeviceSetup extends Component {
  loadDevices() {
    const devices = {
      midiDevice:
        WebMidi.getInputById(defaultdeviceIds.midiDevice) || noOpMidiDevice,
      dawListener:
        WebMidi.getInputById(defaultdeviceIds.dawListener) || noOpMidiDevice,
      outputDevice:
        WebMidi.outputs[0] || noOpMidiDevice
        // WebMidi.getOutputById(defaultdeviceIds.outputDevice) || noOpMidiDevice
    };

    this.props.loadDevices(devices);
  }

  setupWebMidiAPI() {
    WebMidi.enable(err => {
      if (err) {
        this.props.webMidiError(err)
      } else {
        this.loadDevices();
        this.props.enableWebMidi();
      }
    });
  }

  componentWillMount() {
    this.setupWebMidiAPI();
  }

  render() {
    return (
      <div>
        {this.props.ready ? (
          this.props.children
        ) : (
          <div>...loading</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ progression, webMidiEnabled: ready }) => ({
  progression,
  ready
});

const mapDispatchToProps = dispatch => ({
  enableWebMidi: () => dispatch(actions.ENABLE_WEB_MIDI()),
  webMidiError: err => dispatch(actions.WEB_MIDI_ERROR(err)),
  loadDevices: devices => dispatch(actions.LOAD_MIDI_DEVICES(devices))
});

export default connect(mapStateToProps, mapDispatchToProps)(MidiDeviceSetup);
