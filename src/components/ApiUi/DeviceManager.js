import React from 'react';
import WebMidi from 'webmidi';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from '../../actions';

const Div = styled.div`
  display: flex;
  width: 100%;
`;
export class DeviceManager extends React.Component {
  componentWillMount() {
    this.connectListener();
  }

  getDevice(id, type) {
    return WebMidi[`get${type[0].toUpperCase()}${type.slice(1)}ById`](id);
  }

  setDevice(id, type) {
    const device = this.getDevice(id, type);
    this.props.setDevice({ [`${type}Device`]: device });
    type === 'input' && this.connectListener(device);
  }

  connectListener(d) {
    let device;
    if (d) {
      device = d;
      this.props.devices.inputDevice.removeListener('noteoff');
      this.props.devices.inputDevice.removeListener('noteon');
    } else {
      device = this.props.devices.inputDevice;
    }
    device.addListener('noteon', 'all', e => {
      console.log('noteon', e);
    });
    device.addListener('noteoff', 'all', e => {
      console.log('noteoff', e);
    });
  }

  render() {
    return (
      <Div>
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
        <select
          onChange={e => this.setDevice(e.target.value, 'input')}
          value={this.props.devices.inputDevice.id}
          default="default"
        >
          <option value="default" hidden>
            Select an input
          </option>

          {WebMidi.inputs.map((device, idx) => (
            <option value={device.id} key={idx}>
              {`${device.manufacturer} ${device.name}`}
            </option>
          ))}
        </select>
      </Div>
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
