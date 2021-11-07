//
// Global state reducers
//
// Actions to update global state from the different components of the drawing app.
//

// Columns
// eslint-disable-next-line prefer-spread
// Initial values 120, 80
const pixelsWide = 60;
const pixelsTall = 40;
const pixelMargin = 2;

//
// Drawing grid
//
// Define an array (columns)
// of arrays (rows within the columns)
// of booleans (pixels which can be on or off)
// to store the current state of the drawing
//
const gridInitial = () => [...Array(pixelsWide)].map((_, i) => (
  [...Array(pixelsTall)].map((__, j) => ({
    // painted: !(j % 2),
    painted: false,
    x: i,
    y: j,
  }))
));

// Initial default state when the app loads
export const initialState = {
  // Start with drawing enabled
  isDraw: true,
  // Erasing is disabled by default
  isErase: false,
  pixelsWide,
  pixelsTall,
  pixelMargin,
  grid: gridInitial(),
};

export const reducer = (state, action) => {
  // Turn drawing on and erasing off
  if (action.type === 'SET_DRAW') {
    return {
      ...state,
      isDraw: true,
      isErase: false,
    };
  }

  // Turn erasing on and drawing off
  if (action.type === 'SET_ERASE') {
    return {
      ...state,
      isDraw: false,
      isErase: true,
    };
  }

  // Reset the grid to the default state
  if (action.type === 'CLEAR_GRID') {
    // // eslint-disable-next-line no-return-assign,no-param-reassign
    // state.grid = gridInitial();
    return {
      ...state,
      grid: gridInitial(),
    };
  }

  // Update the a single pixel's painted state
  if (action.type === 'UPDATE_GRID') {
    const { x, y, painted } = action.payload;
    return {
      ...state,
      grid: {
        ...state.grid,
        [x]: {
          ...state.grid[x],
          [y]: {
            ...state.grid[x][y],
            painted,
          },
        },
      },
    };
  }

  // Share the grid with the server, so send to Water Wall.
  // TODO: Write websocket communication to share grid to server
  if (action.type === 'SHARE_GRID') {
    console.log('sharing');
    console.log(state.grid);
    console.log(Array.isArray(state.grid) ? 'array' : typeof state.grid);
    console.log('----^ ^ ^ ^ ^ state.grid ^ ^ ^ ^ ^----');
    return state;
  }
  return state;
};
