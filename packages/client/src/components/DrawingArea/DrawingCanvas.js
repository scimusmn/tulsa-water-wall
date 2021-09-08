import React from 'react';
import PropTypes from 'prop-types';
// import DrawRow from '@components/DrawingArea/DrawRow';

const DrawingCanvas = (props) => {
  const { width, height } = props;
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {
        [...Array(height)].map((e, i) => {
          const key = `special${i}`;
          const isOdd = (num) => num % 2;
          return (
            <div className="overflow-hidden bg-blue-light mb-1" key={key}>
              {isOdd}
              {' '}
              -
              {' '}
              {width}
            </div>
          );
        })
      }
    </div>
  );
};

DrawingCanvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

DrawingCanvas.defaultProps = {
  width: 120,
  height: 80,
};

export default DrawingCanvas;
