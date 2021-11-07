//
// Draw row
//
// Draw a single row and then loop over the columns to draw each pixel
//
import React from 'react';
import PropTypes from 'prop-types';
import DrawPixel from '@components/DrawingArea/DrawPixel';

function DrawRow({
  rowHeight, pixelMargin, pixelsWide, y,
}) {
  const divStyle = {
    marginBottom: `${pixelMargin}px`,
    height: `${rowHeight}px`,
    lineHeight: `${rowHeight}px`,
  };
  return (
    <div className="flex flex-row" style={divStyle}>
      {
        [...Array(pixelsWide)].map((e, x) => {
          const key = `special${x}`;
          return (
            <DrawPixel
              x={x}
              y={y}
              key={key}
            />
          );
        })
      }
    </div>
  );
}

DrawRow.propTypes = {
  pixelMargin: PropTypes.number.isRequired,
  pixelsWide: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default DrawRow;
