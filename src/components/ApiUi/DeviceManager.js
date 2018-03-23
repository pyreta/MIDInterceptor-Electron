import React from 'react';
import WebMidi from 'webmidi';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from '../../actions';
import mapScale, { getScaleDegree } from '../../helpers/mapScale';

const Div = styled.div`
  display: flex;
  width: 100%;
`;

const modeIndexMap = { 1: 0, 3: 1, 6: 2, 8: 3, 10: 4 };

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

  getChord(note) {
    const scaleDegree = getScaleDegree(note);
    const chord = this.props.rows[this.props.selectedModeRow][scaleDegree];
    if (chord) {
      const notes = chord.decorate[this.props.voicingDecorator]()
        .voicing()
        .noteValues();
      return notes;
    }
  }

  getNewNote(note) {
    return note.number < 48
      ? this.getChord(note.number)
      : mapScale(note.number, this.props.rows[this.props.selectedModeRow][0].unwrap());
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
      const { note, velocity } = e;
      const newNote = this.getNewNote(note);

      if (newNote) {
        this.props.devices.outputDevice.playNote(newNote, 1, { velocity });
        return;
      }

      if (note.number > 48) {
        const modeIdx = modeIndexMap[note.number % 12];
        if (modeIdx < this.props.rows.length) {
          this.props.selectedModeRow = modeIdx;
        }
        if (modeIdx < this.props.rows.length) {
          this.props.setCurrentModeIdx(modeIdx);
        }
      }
    });
    device.addListener('noteoff', 'all', e => {
      const newNote = this.getNewNote(e.note);

      if (newNote) {
        this.props.devices.outputDevice.stopNote(newNote, 1);
        return;
      }
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

const mapStateToProps = ({
  devices,
  lastPlayedChord,
  voicingDecorator,
  selectedModeRow,
}) => ({
  devices,
  lastPlayedChord,
  voicingDecorator,
  selectedModeRow,
});

const mapDispatchToProps = dispatch => ({
  setDevice: device => dispatch(actions.SET_MIDI_DEVICE(device)),
  setCurrentModeIdx: idx => dispatch(actions.SET_MODE_INDEX(idx)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceManager);
