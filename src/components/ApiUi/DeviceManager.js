import React from 'react';
import WebMidi from 'webmidi';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from '../../actions';

const Div = styled.div`
  justiy-content: space-between;
  margin-right: -3px;
  border-top: 1px dotted black;
`;

const Div2 = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 2px;
  margin-right: 3px;
  flex: 1;
  flex-direction: column;
`;

const Title = styled.span`
  padding: 5px;
  background: #21252b;
  color: #296ed7;
  flex: 1;
  text-align: center;
`;

const DeviceSelect = props => (
  <Div2>
    <Title>{props.text}</Title>
    <select onChange={props.onChange} value={props.value} default="default">
      <option value="default" hidden>
        Select a MIDI device
      </option>

      {props.devices.map((device, idx) => (
        <option value={device.id} key={idx}>
          {`${device.manufacturer} ${device.name}`}
        </option>
      ))}
    </select>
  </Div2>
);

export class DeviceManager extends React.Component {
  getDevice(id, type) {
    return WebMidi[`get${type[0].toUpperCase()}${type.slice(1)}ById`](id);
  }

  setDevice(id, type) {
    const newDevice = this.getDevice(id, type);
    this.props.setDevice({ [`${type}Device`]: newDevice });
    type === 'input' &&
      this.props.connectMidiController({ newDevice, ...this.props });
  }

  render() {
    return (
      <Div>
        <DeviceSelect
          onChange={e => this.setDevice(e.target.value, 'output')}
          value={this.props.devices.outputDevice.id}
          text="Output to DAW"
          devices={WebMidi.outputs}
        />
        <DeviceSelect
          onChange={e => this.setDevice(e.target.value, 'input')}
          value={this.props.devices.inputDevice.id}
          text="Input from keyboard"
          devices={WebMidi.inputs}
        />
      </Div>
    );
  }
}

const mapStateToProps = ({ devices, voicingDecorator, selectedModeRow }) => ({
  devices,
  voicingDecorator,
  selectedModeRow,
});

const mapDispatchToProps = dispatch => ({
  setDevice: device => dispatch(actions.SET_MIDI_DEVICE(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceManager);
