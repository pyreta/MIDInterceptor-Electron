export const midiActions = {
  noteon: (eventObject, output) => Object.values(eventObject).forEach(e => {
    output.playNote(e.note.number, 1, { velocity: e.velocity });
  }),
  noteoff: (eventObject, output) => Object.values(eventObject).forEach(e => {
    output.stopNote(e.note.number, 1);
  }),
  pitchbend: (e, output) => output.sendPitchBend(e.value, 1),
  controlchange: (e, output) => output.sendControlChange(e.controller.name, e.value, 1)
};

const currentNotesListener = {
  noteon: (e, context) => context.dispatch({ notes: context.notes.add(e.note) }),
  noteoff: (e, context) => context.dispatch({ notes: context.notes.delete(e.note) })
};

const filterListener = {
  noteon: (e, context) => {
    const filteredEvents = context.state.selectedFilters.reduce((accum, filter) => filter(accum), {
      [e.note.number]: e
    });
    midiActions.noteon(filteredEvents, context.state.outputDevice);
  },
  noteoff: (e, context) => {
    const filteredEvents = context.state.selectedFilters.reduce((accum, filter) => filter(accum), {
      [e.note.number]: e
    });
    midiActions.noteoff(filteredEvents, context.state.outputDevice);
  }
}

export default [
  currentNotesListener,
  filterListener
];
