import React from 'react';
import IconDraw from '../../images/icon-draw.svg';
import IconErase from '../../images/icon-erase.svg';

const SidebarLeft = () => (
  <div className="w-2/12">
    <div className="mx-12">
      <div className="flex flex-col h-screen justify-center">
        <div>
          <div className="shadow-2xl text-4xl box-border text-center border-2 rounded-2xl my-8 mx-3 p-3 text-center text-white">
            <IconDraw />
            Draw
          </div>
          <div className="shadow-2xl text-4xl box-border text-center border-2 rounded-2xl my-8 mx-3 p-3 text-center text-white">
            <IconErase />
            Erase
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SidebarLeft;
