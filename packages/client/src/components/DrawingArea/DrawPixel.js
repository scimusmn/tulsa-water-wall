//
// Draw pixel
//
// Draw an individual pixel and setup basic on/off state based on a click
//
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/App';

function DrawPixel({ x, y }) {
  //
  // Get global state and dispatch function for updating on share
  //
  // We only update global state when the sidebar triggers a share by switching isShare on.
  // This operation is expensive and can't be done on every pixel paint without degrading
  // the painting experience.
  //
  const [state, dispatch] = useContext(AppContext);
  const {
    isDraw, isClear, isFlip, isShare,
  } = state;

  // Set up local state for tracking pixel paint in the pixel itself.
  const [localPainted, setLocalPainted] = useState(false);

  // Use effect to allow the local component to update global state when isShare is enabled.
  // We need to useEffect here so that this doesn't get triggered on every component load or change.
  useEffect(() => {
    // On clear, set painted to false for all pixels
    if (isClear) {
      setLocalPainted(false);
    }

    // On flip, switch the painted value to the opposite of the current value
    if (isFlip) {
      setLocalPainted(!localPainted);
    }

    if (isShare) {
      dispatch({
        type: 'UPDATE_GRID',
        payload: {
          x,
          y,
          painted: localPainted,
        },
      });
    }
    // Pass state and dispatch to the effect, so that we can trigger it when the
    // isShare toggle is enabled.
  }, [state, dispatch]);

  return (
    <div
      // Paint pixel based on local state for the current pixel
      className={`bg-${(localPainted
        ? 'white'
        : 'blue-light')} flex-grow`}
      role="button"
      // On hover, update local state of the current pixel, depending on draw or erase mode
      // TODO: change this an event that works for touchscreen
      onMouseEnter={() => (isDraw ? setLocalPainted(true) : setLocalPainted(false))}
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
