import React from 'react';
import WebMidi from 'webmidi';
import { connect } from 'react-redux';
import actions from '../../actions';

export class DeviceManager extends React.Component {
  getDevice(id, type) {
    return WebMidi[`get${type[0].toUpperCase()}${type.slice(1)}ById`](id);
  }

  setDevice(id, type = 'input') {
    const outputDevice = this.getDevice(id, 'output');
    this.props.setDevice({ outputDevice });
  }

  render() {
    return (
      <select
        onChange={e => this.setDevice(e.target.value, 'output')}
        value={this.props.devices.outputDevice.id}
        default="default"
      >
        <option value="default" hidden>
          Select an output
        </option>
        {WebMidi.outputs.map((device, idx) => (
          <option value={device.id} key={idx}>
            {`${device.manufacturer} ${device.name}`}
          </option>
        ))}
      </select>
    );
  }
}

const mapStateToProps = ({ devices }) => ({
  devices,
});

const mapDispatchToProps = dispatch => ({
  setDevice: device => dispatch(actions.SET_MIDI_DEVICE(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceManager);
