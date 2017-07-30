export default {
  noteon: (eventObject, output) => Object.values(eventObject).forEach(e => {
    output.playNote(e.note.number, 1, { velocity: e.velocity });
  }),
  noteoff: (eventObject, output) => Object.values(eventObject).forEach(e => {
    output.stopNote(e.note.number, 1);
  }),
  pitchbend: (e, output) => output.sendPitchBend(e.value, 1),
  controlchange: (e, output) => output.sendControlChange(e.controller.name, e.value, 1)
};
