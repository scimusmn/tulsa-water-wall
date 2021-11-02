/* eslint-disable import/prefer-default-export */
// Don't require a default export. Gatsby's API can't support it here.
import PropTypes from 'prop-types';
import React from 'react';
import './src/css/index.css';
import Provider from './src/contexts/Drawing/provider';

// Wrap entire app in a Global State provider
export const wrapRootElement = ({ element }) => <Provider>{element}</Provider>;

wrapRootElement.propTypes = {
  element: PropTypes.element.isRequired,
};
