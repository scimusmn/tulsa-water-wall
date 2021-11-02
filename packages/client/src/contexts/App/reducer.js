//
// Global state reducers
//
// Actions to update global state from the different components of the drawing app.
//
export const reducer = (state, action) => {
  switch (action.type) {
    // Turn drawing on and erasing off
    case 'SET_DRAW':
      return {
        ...state,
        isDraw: true,
        isErase: false,
      };

    // Turn erasing on and drawing off
    case 'SET_ERASE':
      return {
        ...state,
        isDraw: false,
        isErase: true,
      };

    default:
      return state;
  }
};

// Initial default state when the app loads
export const initialState = {
  // Start with drawing enabled
  isDraw: true,
  // Erasing is disabled by default
  isErase: false,
};
