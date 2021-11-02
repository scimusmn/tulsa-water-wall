//
// Sidebar Left
//
// Buttons for toggling Draw and Erase mode
// Button state is stored in the global AppContext
//
import React from 'react';
import IconDraw from '../../images/icon-draw.svg';
import IconErase from '../../images/icon-erase.svg';
import { AppContext } from '../../contexts/App';

const SidebarLeft = () => {
  const [state, dispatch] = React.useContext(AppContext);

  return (
    <div className="w-2/12">
      <div className="mx-12">
        <div className="flex flex-col h-screen justify-center">
          <div>
            <div
              onClick={() => dispatch({ type: 'SET_DRAW' })}
              role="button"
              className={`bg-${state.isDraw
                ? 'blue'
                : 'blue-light'} shadow-2xl text-4xl box-border text-center border-2 rounded-2xl my-8 mx-3 p-3 text-center text-white`}
            >
              <IconDraw />
              Draw
            </div>
            <div
              onClick={() => dispatch({ type: 'SET_ERASE' })}
              role="button"
              className={`bg-${state.isErase
                ? 'blue'
                : 'blue-light'} shadow-2xl text-4xl box-border text-center border-2 rounded-2xl my-8 mx-3 p-3 text-center text-white`}
            >
              <IconErase />
              Erase
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
