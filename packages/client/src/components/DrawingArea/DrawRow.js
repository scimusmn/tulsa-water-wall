//
// Draw row
//
// Draw a single row and then loop over the columns to draw each pixel
//
import React from 'react';
import PropTypes from 'prop-types';
import DrawPixel from '@components/DrawingArea/DrawPixel';

function DrawRow({
  color, rowHeight, pixelMargin, pixelsWide,
}) {
  const divStyle = {
    marginBottom: `${pixelMargin}px`,
    height: `${rowHeight}px`,
    lineHeight: `${rowHeight}px`,
  };
  return (
    // Row
    <div className="flex flex-row" style={divStyle}>
      {
        [...Array(pixelsWide)].map((e, i) => {
          const key = `special${i}`;
          return (
            <DrawPixel
              key={key}
              color={color}
            />
          );
        })
      }
    </div>
  );
}

DrawRow.propTypes = {
  color: PropTypes.string.isRequired,
  rowHeight: PropTypes.number.isRequired,
  pixelMargin: PropTypes.number.isRequired,
  pixelsWide: PropTypes.number.isRequired,
};

export default DrawRow;
