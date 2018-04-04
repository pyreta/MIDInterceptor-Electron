import React, { Component } from 'react';
import WebMidi from 'webmidi';
import noOpMidiDevice from '../../helpers/noOpMidiDevice';
// import { defaultdeviceIds } from '../../constants';
import actions from '../../actions';
import { connect } from 'react-redux';


class MidiDeviceSetup extends Component {
  loadDevices() {
    const devices = {
      inputDevice:
        // noOpMidiDevice,
        WebMidi.inputs[WebMidi.inputs.length - 1] || noOpMidiDevice,
        // WebMidi.getInputById(defaultdeviceIds.midiDevice) || noOpMidiDevice,
      dawListener:
        WebMidi.inputs[0] || noOpMidiDevice,
        // WebMidi.getInputById(defaultdeviceIds.dawListener) || noOpMidiDevice,
      outputDevice:
        WebMidi.outputs.length === 2 ? noOpMidiDevice : WebMidi.outputs[1]
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
          <div>
            {this.props.children}
          </div>
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
