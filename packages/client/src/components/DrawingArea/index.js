import React from 'react';
import DrawingCanvas from '@components/DrawingArea/DrawingCanvas';

const Drawing = () => (
  <div className="bg-yellow mt-5 h-5/6">
    <DrawingCanvas pixelsWide={120} pixelsTall={80} pixelMargin={2} />
  </div>
);

export default Drawing;
