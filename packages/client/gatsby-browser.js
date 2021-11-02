/* eslint-disable import/prefer-default-export */
// Don't require a default export. Gatsby's API can't support it here.
import PropTypes from 'prop-types';
import React from 'react';
import './src/css/index.css';
import AppProvider from './src/contexts/App';

// Wrap entire app in a Global State provider
export const wrapRootElement = ({ element }) => <AppProvider>{element}</AppProvider>;

wrapRootElement.propTypes = {
  element: PropTypes.element.isRequired,
};
