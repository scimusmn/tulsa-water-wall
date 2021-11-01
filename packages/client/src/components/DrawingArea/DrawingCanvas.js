import React from 'react';
import PropTypes from 'prop-types';
import DrawRow from '@components/DrawingArea/DrawRow';

const DrawingCanvas = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { pixelsWide, pixelsTall, pixelMargin } = props;
  return (
    // Drawing area column
    <div className="flex flex-col h-full overflow-hidden">
      {
        [...Array(pixelsTall)].map((e, i) => {
          const key = `special${i}`;
          const screenHeight = 1080;
          const drawingHeight = screenHeight * (5 / 6);
          const rowHeight = (((drawingHeight - (pixelMargin * pixelsTall)) / pixelsTall));
          return (
            <DrawRow
              pixelsWide={pixelsWide}
              pixelMargin={pixelMargin}
              rowHeight={rowHeight}
              rowIndex={i + 1}
              key={key}
              color="blue-light"
              width="1"
            />
          );
        })
      }
    </div>
  );
};

DrawingCanvas.propTypes = {
  pixelsWide: PropTypes.number.isRequired,
  pixelsTall: PropTypes.number.isRequired,
  pixelMargin: PropTypes.number.isRequired,
};

export default DrawingCanvas;
