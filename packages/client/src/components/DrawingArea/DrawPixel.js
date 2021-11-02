//
// Draw pixel
//
// Draw an individual pixel and setup basic on/off state based on a click
//
import React, { useState } from 'react';
import { AppContext } from '../../contexts/Drawing/provider';

function DrawPixel() {
  const [active, setActive] = useState(false);
  return (
    <AppContext.Consumer>
      {(context) => {
        const { isDraw } = context;
        return (
          <div
            className={`bg-${(active
              ? 'white'
              : 'blue-light')} flex-grow`}
            role="button"
            // Style pixel depending on whether we're in draw or erase mode
            onMouseEnter={() => (isDraw ? setActive(true) : setActive(false))}
          >
            &nbsp;
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

export default DrawPixel;
