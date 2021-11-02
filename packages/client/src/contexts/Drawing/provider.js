//
// Global state provider
//
// Set global state for Drawing application settings
// Draw / Erase toggle
//
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

const Provider = ({ children }) => {
  const [isDraw, setDraw] = useState(true);
  const [isErase, setErase] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isDraw,
        setDraw: () => {
          setErase(false);
          setDraw(true);
        },
        isErase,
        setErase: () => {
          setDraw(false);
          setErase(true);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
