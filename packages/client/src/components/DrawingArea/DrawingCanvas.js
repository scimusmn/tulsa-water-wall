//
// Draw the canvas for the drawing area.
//
// Draw columns and then rows
//
import React from 'react';
import PropTypes from 'prop-types';
import DrawRow from '@components/DrawingArea/DrawRow';

const DrawingCanvas = (props) => {
  const { pixelsWide, pixelsTall, pixelMargin } = props;
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {
        [...Array(pixelsTall)].map((e, y) => {
          const key = `special${y}`;
          // TODO: Move to a higher level constants file/prop
          const screenHeight = 1080;
          const drawingHeight = screenHeight * (5 / 6);
          const rowHeight = (((drawingHeight - (pixelMargin * pixelsTall)) / pixelsTall));
          return (
            <DrawRow
              key={key}
              pixelMargin={pixelMargin}
              pixelsWide={pixelsWide}
              rowHeight={rowHeight}
              y={y}
            />
          );
        })
      }
    </div>
  );
};

DrawingCanvas.propTypes = {
  pixelMargin: PropTypes.number.isRequired,
  pixelsTall: PropTypes.number.isRequired,
  pixelsWide: PropTypes.number.isRequired,
};

export default DrawingCanvas;
