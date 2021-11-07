//
// Drawing area
//
// Set up the dimensions of the drawing area
//
import React from 'react';
import DrawingCanvas from '@components/DrawingArea/DrawingCanvas';
import { AppContext } from '../../contexts/App';

const Drawing = () => {
  const [state] = React.useContext(AppContext);

  return (
    <div className="bg-white mt-5 h-5/6">
      <DrawingCanvas
        pixelsWide={state.pixelsWide}
        pixelsTall={state.pixelsTall}
        pixelMargin={state.pixelMargin}
      />
    </div>
  );
};

export default Drawing;
