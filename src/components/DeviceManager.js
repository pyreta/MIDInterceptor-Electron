import React from 'react';
import WebMidi from 'webmidi';

const DeviceSelect = ({ text, updateDevice, device, devices, deviceType, type }) =>
  <div>
    <div>{text}</div>
    <select onChange={(e)=> updateDevice(e.target.value, deviceType, type)} value={device}>
    {devices.map((device, idx) =>
      <option value={device.id} key={idx}>
        {`${device.manufacturer} ${device.name}`}
      </option>)}
    </select>
  </div>

export class DeviceManager extends React.Component {

  getDevice(id, type) {
    return WebMidi[`get${type[0].toUpperCase()}${type.slice(1)}ById`](id);
  }

  setDevice(id, device, type = 'input') {
    const newDevice = this.getDevice(id, type);
    if (type === 'input' ) {
      type === 'input' && this.props.registeredListeners.forEach(
        listener => listener(newDevice)
      );
      this.props[device].removeListener();
    }
    this.props.dispatch({
      [device]: newDevice,
    })
  }

  render() {
    return (
      (
      <div style={{padding: '20px'}}>
        <DeviceSelect
          devices={WebMidi.inputs}
          deviceType='midiDevice'
          text='Select Midi Controller'
          updateDevice={this.setDevice.bind(this)}
          device={this.props.midiDevice.id}
        />
        <DeviceSelect
          devices={WebMidi.inputs}
          deviceType='dawListener'
          text='Select Input from DAW'
          updateDevice={this.setDevice.bind(this)}
          device={this.props.dawListener.id}
        />
        <DeviceSelect
          devices={WebMidi.outputs}
          deviceType='outputDevice'
          text='Select Output Device'
          type='output'
          updateDevice={this.setDevice.bind(this)}
          device={this.props.outputDevice.id}
        />
      </div>
    )
    )
  }
}

export default DeviceManager
