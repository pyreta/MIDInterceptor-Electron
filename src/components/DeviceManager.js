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

const DeviceManager = ({
  state: {
    WebMidi: {
      inputs,
      outputs
    },
    midiDevice,
    dawListener,
    outputDevice
  },
  updateDevice,
}) => {
  return (
  <div style={{padding: '20px'}}>
    <DeviceSelect
      devices={inputs}
      deviceType='midiDevice'
      text='Select Midi Controller'
      updateDevice={updateDevice}
      device={midiDevice.id}
    />
    <DeviceSelect
      devices={inputs}
      deviceType='dawListener'
      text='Select Input from DAW'
      updateDevice={updateDevice}
      device={dawListener.id}
    />
    <DeviceSelect
      devices={outputs}
      deviceType='outputDevice'
      text='Select Output Device'
      type='output'
      updateDevice={updateDevice}
      device={outputDevice.id}
    />
  </div>
)}

export default DeviceManager;
