//
// Global state reducers
//
// Actions to update global state from the different components of the drawing app.
//

// Constants
const pixelsWide = 120;
const pixelsTall = 80;
const pixelMargin = 0;
const shareLockoutSeconds = 10;

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
  // Toggle to trigger updating the global state. Defaults to off, since this is an expensive
  // operation and we only want to do this when a share is triggered.
  isShare: false,
  isClear: false,
  isFlip: false,
  pixelsWide,
  pixelsTall,
  pixelMargin,
  shareLockoutSeconds,
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
    return {
      ...state,
      isClear: true,
      // If you are in erase mode and get left in erase mode after a clear, you might be confused
      // as to why nothing is happening. Ensure we return to drawing mode after a clear since
      // there's nothing to erase.
      isDraw: true,
      isErase: false,
    };
  }

  // Reset the grid to the default state
  if (action.type === 'CLEAR_RESET') {
    return {
      ...state,
      isClear: false,
    };
  }

  // Reset the grid to the default state
  if (action.type === 'FLIP_GRID') {
    return {
      ...state,
      isFlip: true,
    };
  }

  // Reset the grid to the default state
  if (action.type === 'FLIP_RESET') {
    return {
      ...state,
      isFlip: false,
    };
  }

  //
  // Update the global state grid
  //
  // When the SHARE_GRID action is triggered each pixel will call this action, updating the
  // painted value for that pixel. At the end of this operation we set isShare to false, so
  // that the grid is only updated once. Otherwise the updating would trigger an infinite loop.
  //
  // We watch the x & y values to see if we're at the end of the grid. On the last pixel of the
  // drawing we send the whole grid value to websocket connection so that the server can send
  // the drawing to the Arduino array.
  //
  if (action.type === 'UPDATE_GRID') {
    const { x, y, painted } = action.payload;
    const newState = {
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
      isShare: false,
    };
    if (x === (pixelsWide - 1) && y === (pixelsTall - 1)) {
      const { socket } = newState;
      socket.send(JSON.stringify(newState.grid));
    }
    return newState;
  }

  //
  // Start sharing process
  //
  // Turn sharing on, so that all the pixels can start updating the global state with their
  // painted values.
  //
  // We also add the websocket connection to state, so that another dispatch can send the data
  // once the global state grid has been populated. This websocket connection needs to be opened
  // on a component load, so that it can get access to the browser API.
  //
  if (action.type === 'SHARE_GRID') {
    return {
      ...state,
      isShare: true,
      socket: action.payload.socket,
    };
  }

  return state;
};
