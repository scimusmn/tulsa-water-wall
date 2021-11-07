import React from 'react';
import IconFlip from '../../images/icon-flip.svg';
import IconTrash from '../../images/icon-trash.svg';
import IconArrowUp from '../../images/icon-arrow-up.svg';
import { AppContext } from '../../contexts/App';

const SidebarRight = () => {
  // TODO: figure out if there's a way to assign the second argument of this context
  // without needing an exception for the empty _ variable.
  // eslint-disable-next-line no-unused-vars
  const [_, dispatch] = React.useContext(AppContext);

  return (
    <div className="w-2/12 relative">
      <div className="mx-12 relative">
        <div
          role="button"
          onMouseDown={() => {
            dispatch({ type: 'CLEAR_GRID' });
          }}
          className="flex flex-col justify-center h-screen"
        >
          <div className="text-4xl text-center border-2 rounded-2xl my-3 mt-28 p-3 text-white relative">
            <IconFlip className="absolute left-5 bottom-2" style={{ height: '45px' }} />
            Flip
          </div>
          <div className="text-4xl text-center border-2 rounded-2xl my-3 p-3 text-white relative">
            <IconTrash className="absolute left-5 bottom-2" style={{ height: '45px' }} />
            Clear
          </div>
        </div>
        <div
          className="absolute w-full bottom-20 text-4xl text-center border-2 rounded-2xl p-3 text-blue bg-white"
          role="button"
          onMouseDown={() => {
            dispatch({ type: 'SHARE_GRID' });
          }}
        >
          <IconArrowUp
            className="absolute left-5 bottom-2 float-left mr-4"
            style={{ height: '45px' }}
          />
          Share
        </div>
      </div>
    </div>
  );
};

export default SidebarRight;
