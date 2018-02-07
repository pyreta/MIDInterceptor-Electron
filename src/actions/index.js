export const createActionsAndTypes = actionTypes => (
  actionTypes.reduce((accum, type) => {
    accum.actions[type] = (payload, otherAttrs = {}) => ({ type, payload, ...otherAttrs });
    accum.actionTypes[type] = type;
    return accum;
  }, { actions: {}, actionTypes: {}})
)

const actionsAndTypes = createActionsAndTypes([
  'CHANGE_KEY',
  'ADD_SEVEN',
  'REMOVE_SEVEN',
  'ENABLE_WEB_MIDI',
  'LOAD_MIDI_DEVICES',
  'ADD_KEY_PRESS',
  'REMOVE_KEY_PRESS',
  'UPDATE_CHORD_BODY',
]);

export const actionTypes = actionsAndTypes.actionTypes;
const actions = actionsAndTypes.actions;

export default actions;
