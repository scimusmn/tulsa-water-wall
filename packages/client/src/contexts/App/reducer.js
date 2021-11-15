//
// Global state reducers
//
// Actions to update global state from the different components of the drawing app.
//

// Columns
// eslint-disable-next-line prefer-spread
// Initial values 120, 80
const pixelsWide = 120;
const pixelsTall = 80;
const pixelMargin = 0;

//
// Drawing grid
//
// Define an array (rows)
// of arrays (columns within the rows)
// of booleans (pixels which can be on or off)
// to store the current state of the drawing
//
const gridInitial = () => [...Array(pixelsTall)].map((_, i) => (
  [...Array(pixelsWide)].map((__, j) => ({
    // painted: !(j % 2),
    painted: false,
    x: j,
    y: i,
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
        [y]: {
          ...state.grid[y],
          [x]: {
            ...state.grid[y][x],
            painted,
          },
        },
      },
    };
  }

  // Share the grid with the server, so send to Water Wall.
  // TODO: Write websocket communication to share grid to server
  if (action.type === 'SHARE_GRID') {
    const { socket } = action.payload;
    socket.send(JSON.stringify(state.grid));
    return state;
  }

  return state;
};
