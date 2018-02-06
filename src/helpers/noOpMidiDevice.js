const noOpMidiDevice = {
  addListener: () => {},
  removeListener: () => {},
  playNote: (...args) => {
    console.log('---No MIDI device--');
    console.log('playNote called with:', args);
  },
  stopNote: () => {}
};

export default noOpMidiDevice;
