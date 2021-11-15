//
// Draw pixel
//
// Draw an individual pixel and setup basic on/off state based on a click
//
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { AppContext } from '../../contexts/App';

function DrawPixel({ x, y }) {
  const [state, dispatch] = useContext(AppContext);
  const { grid } = state;
  const { painted } = grid[y][x];
  return (
    <div
      // Paint pixel based on global state for the current pixel
      className={`bg-${(painted
        ? 'white'
        : 'blue-light')} flex-grow`}
      role="button"
      // On hover, update global state of the current pixel, depending on draw or erase mode
      onMouseEnter={() => {
        dispatch({
          type: 'UPDATE_GRID',
          payload: {
            x,
            y,
            painted: !!state.isDraw,
          },
        });
      }}
    >
      &nbsp;
    </div>
  );
}

DrawPixel.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default DrawPixel;
