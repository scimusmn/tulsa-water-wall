'use strict';

const state = {};
const stateListeners = {};

const updateState = (state, update) => Object.keys(update).forEach(
  key => {
    if (typeof(state[key]) === 'object'
	&& typeof(state[key]) !== 'null'
	&& typeof(update[key]) === 'object'
	&& update[key] !== null
	&& !(Array.isArray(state[key]))
       )
      updateState(state[key], update[key]);
    else
      state[key] = update[key];
  });

const setState = update => {
  updateState(state, update);
  Object.keys(update).forEach(key => {
    const list = stateListeners[key];
    if (list !== undefined) {
      list.forEach(cb => cb());
    }
  });
}


const onStateUpdate = (key, cb) => {
  if (stateListeners[key] === undefined)
    stateListeners[key] = [];
  stateListeners[key].push(cb);
}
