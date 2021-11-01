//
// Draw pixel
//
// Draw an individual pixel and setup basic on/off state based on a click
//
import React, { useState } from 'react';

function DrawPixel() {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`bg-${(active
        ? 'white'
        : 'blue-light')} flex-grow`}
      role="button"
      onMouseEnter={() => setActive(!active)}
    >
      &nbsp;
    </div>
  );
}

export default DrawPixel;
