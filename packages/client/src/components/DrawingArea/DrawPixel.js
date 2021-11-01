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
        : 'blue-light')} flex-grow block bg-blue-500 hover:bg-blue-700 text-white font-bold mx-1 py-2 px-4 rounded`}
      role="button"
      onClick={() => setActive(!active)}
    >
      &nbsp;
    </div>
  );
}

export default DrawPixel;
