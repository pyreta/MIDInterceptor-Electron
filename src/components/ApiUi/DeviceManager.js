import React from 'react';
import WebMidi from 'webmidi';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from '../../actions';
import mapScale, { getScaleDegree } from '../../helpers/mapScale';

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: -3px;
`;

const Div2 = styled.div`
  display: flex;
  border: 2px solid #21252b;
  border-radius: 4px;
  padding: 2px;
  margin-right: 3px;
  flex: 1;
  margin-bottom: 3px;
`;

const Title = styled.span`
  padding: 5px;
  font-size: 11px;
  background: #21252b;
  color: #296ed7;
  flex: 1;
  text-align: center;
`;

const DeviceSelect = props => (
  <Div2>
    <Title>{props.text}</Title>
    <select
      onChange={props.onChange}
      value={props.value}
      default="default"
      >
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
          this.props.selectModeRow(modeIdx);
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

  componentWillReceiveProps({ rows, selectedModeRow }) {
    if (selectedModeRow >= rows.length) {
      this.props.selectModeRow(rows.length - 1);
    }
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
  selectModeRow: idx => dispatch(actions.SELECT_MODE_ROW(idx)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceManager);
