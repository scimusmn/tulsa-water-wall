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
      // recursively update for objects, so long as they aren't
      // arrays or nulls (which are apparently of type 'object'??)
      updateState(state[key], update[key]);
    else
      state[key] = update[key];
  });

// mimic react's state function
const setState = update => {
  // modify the state object
  updateState(state, update);
  
  // trigger event listeners for the given state keys that have changed
  Object.keys(update).forEach(key => {
    const list = stateListeners[key];
    if (list !== undefined) {
      list.forEach(cb => cb());
    }
  });
}


// register state update listener for specific key
const onStateUpdate = (key, cb) => {
  if (stateListeners[key] === undefined)
    stateListeners[key] = [];
  stateListeners[key].push(cb);
}
