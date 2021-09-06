/* eslint-disable import/prefer-default-export */
// Don't require a default export. Gatsby's API can't support it here.
import PropTypes from 'prop-types';
import React from 'react';
import './src/css/index.css';

export const wrapRootElement = ({ element }) => (
  <div className="root overflow-hidden">{element}</div>
);

wrapRootElement.propTypes = {
  element: PropTypes.element.isRequired,
};
