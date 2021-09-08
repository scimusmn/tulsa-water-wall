import React from 'react';
import DrawingCanvas from '@components/DrawingArea/DrawingCanvas';

const Drawing = () => (
  <div className="bg-yellow mt-5 h-5/6">
    <DrawingCanvas width={120} height={80} />
  </div>
);

export default Drawing;
