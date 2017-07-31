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

const record = (e, context) => {
  if (context.state.recording) {
    const time = `${context.state.breathcontrollercoarse}.${context.state.programchange}.${context.state.channelaftertouch}`;
    context.state.recordedEvents[time] ?
    context.state.recordedEvents[time].push(e) :
    context.state.recordedEvents[time] = [e]
  }
};

const recordingEventsListener = {
  noteon: (e, context) => record(e, context),
  noteoff: (e, context) => record(e, context)
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
  recordingEventsListener,
  filterListener
];
