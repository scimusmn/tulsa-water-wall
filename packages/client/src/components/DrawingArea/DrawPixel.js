//
// Draw pixel
//
// Draw an individual pixel and setup basic on/off state based on a click
//
import React, { useState } from 'react';
import { AppContext } from '../../contexts/App';

function DrawPixel() {
  const [state] = React.useContext(AppContext);
  const [active, setActive] = useState(false);
  return (
    <div
      className={`bg-${(active
        ? 'white'
        : 'blue-light')} flex-grow`}
      role="button"
      // Style pixel depending on whether we're in draw or erase mode
      onMouseEnter={() => (state.isDraw ? setActive(true) : setActive(false))}
    >
      &nbsp;
    </div>
  );
}

export default DrawPixel;
