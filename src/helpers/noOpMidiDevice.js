const noOpMidiDevice = {
  addListener: (...args) => {
    console.log('---No Input device--');
    console.log('addListener called with:', args);
  },
  removeListener: (...args) => {
    console.log('---No Input device--');
    console.log('removeListener called with:', args);
  },
  playNote: (...args) => {
    console.log('---No Output device--');
    console.log('playNote called with:', args);
  },
  stopNote: () => {}
};

export default noOpMidiDevice;
