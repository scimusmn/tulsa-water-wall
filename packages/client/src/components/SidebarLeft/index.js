//
// Sidebar Left
//
// Buttons for toggling Draw and Erase mode
// Button state is stored in the global AppContext
//
import React from 'react';
import IconDraw from '../../images/icon-draw.svg';
import IconErase from '../../images/icon-erase.svg';
import { AppContext } from '../../contexts/Drawing/provider';

const SidebarLeft = () => (
  <div className="w-2/12">
    <div className="mx-12">
      <div className="flex flex-col h-screen justify-center">
        <AppContext.Consumer>
          {(context) => (
            <div>
              <div
                onClick={() => context.setDraw()}
                role="button"
                className={`bg-${context.isDraw
                  ? 'blue'
                  : 'blue-light'} shadow-2xl text-4xl box-border text-center border-2 rounded-2xl my-8 mx-3 p-3 text-center text-white`}
              >
                <IconDraw />
                Draw
              </div>
              <div
                onClick={() => context.setErase()}
                role="button"
                className={`bg-${context.isErase
                  ? 'blue'
                  : 'blue-light'} shadow-2xl text-4xl box-border text-center border-2 rounded-2xl my-8 mx-3 p-3 text-center text-white`}
              >
                <IconErase />
                Erase
              </div>
            </div>
          )}
        </AppContext.Consumer>
      </div>
    </div>
  </div>
);

export default SidebarLeft;
