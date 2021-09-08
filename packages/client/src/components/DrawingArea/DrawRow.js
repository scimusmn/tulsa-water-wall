import React from 'react';
import PropTypes from 'prop-types';

function DrawRow({ color, width }) {
  return (
    [...Array(width)].map((e, i) => {
      const key = `special${i}`;
      return (<div className={`flex-1 mr-1 mt-1 bg-${color}`} key={key}>&nbsp;</div>);
    })
  );
}

DrawRow.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default DrawRow;
