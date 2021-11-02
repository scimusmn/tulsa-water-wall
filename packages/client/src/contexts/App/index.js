//
// Global state provider
//
// Set global state for Drawing application settings
// E.g., Draw / Erase toggle and drawing grid state
//
import React from 'react';
import PropTypes from 'prop-types';
import { reducer, initialState } from './reducer';

export const AppContext = React.createContext({
  state: initialState,
  dispatch: () => null,
});

const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
