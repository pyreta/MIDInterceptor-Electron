export const passThrough = {
  noteon: (e, output) => output.playNote(e.note.number, 1, {velocity: e.velocity}),
  noteoff: (e, output) => output.stopNote(e.note.number, 1),
  pitchbend: (e, output) => output.sendPitchBend(e.value, 1),
  controlchange: (e, output) => output.sendControlChange(e.controller.name, e.value, 1)
};

export const octaveUp = {
  noteon: (e, output) => output.playNote(e.note.number+12, 1, {velocity: e.velocity}),
  noteoff: (e, output) => output.stopNote(e.note.number+12, 1),
  pitchbend: (e, output) => output.sendPitchBend(e.value, 1),
  controlchange: (e, output) => output.sendControlChange(e.controller.name, e.value, 1)
};

export const tripleOctave = {
  noteon: (e, output) => output.playNote([e.note.number-12, e.note.number, e.note.number+12], 1, {velocity: e.velocity}),
  noteoff: (e, output) => output.stopNote([e.note.number-12, e.note.number, e.note.number+12], 1),
  pitchbend: (e, output) => output.sendPitchBend(e.value, 1),
  controlchange: (e, output) => output.sendControlChange(e.controller.name, e.value, 1)
};

export const octaveDown = {
  noteon: (e, output) => output.playNote(e.note.number-12, 1, {velocity: e.velocity}),
  noteoff: (e, output) => output.stopNote(e.note.number-12, 1),
  pitchbend: (e, output) => output.sendPitchBend(e.value, 1),
  controlchange: (e, output) => output.sendControlChange(e.controller.name, e.value, 1)
};

export const majorChord = {
  noteon: (e, output) => output.playNote([e.note.number, e.note.number+4, e.note.number+7], 1, {velocity: e.velocity}),
  noteoff: (e, output) => output.stopNote([e.note.number, e.note.number+4, e.note.number+7]),
  pitchbend: (e, output) => output.sendPitchBend(e.value, 1),
  controlchange: (e, output) => output.sendControlChange(e.controller.name, e.value, 1)
};

const dynamic = (e, distance) => {
  const diff = parseInt((distance * 20) * (1.0 - e.velocity), 10);
  return `${diff === 0 ? 1 : diff}`
};

export const minorSeventh = {
  noteon: (e, output) => {
    output.playNote(e.note.number-24, 1, {velocity: e.velocity, time: `+${dynamic(e, 0)}`})
    output.playNote(e.note.number-12, 1, {velocity: e.velocity, time: `+${dynamic(e, 12-10)}`});
    output.playNote(e.note.number, 1, {velocity: e.velocity, time: `+${dynamic(e, 24-10)}`});
    output.playNote(e.note.number+3, 1, {velocity: e.velocity, time: `+${dynamic(e, 27-10)}`});
    output.playNote(e.note.number+7, 1, {velocity: e.velocity, time: `+${dynamic(e, 30-10)}`});
    output.playNote(e.note.number+10, 1, {velocity: e.velocity, time: `+${dynamic(e, 40-10)}`});
    output.playNote(e.note.number+15, 1, {velocity: e.velocity, time: `+${dynamic(e, 55-10)}`});
  },

  noteoff: (e, output) => output.stopNote([
    e.note.number-24,
    e.note.number-12,
    e.note.number,
    e.note.number+3,
    e.note.number+7,
    e.note.number+10,
    e.note.number+15,
  ]),
  pitchbend: (e, output) => output.sendPitchBend(e.value, 1),
  controlchange: (e, output) => output.sendControlChange(e.controller.name, e.value, 1)
};
