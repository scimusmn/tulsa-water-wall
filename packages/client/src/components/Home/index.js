import React from 'react';
import IconDraw from '../../images/icon-draw.svg';
import IconErase from '../../images/icon-erase.svg';
import IconFlip from '../../images/icon-flip.svg';
import IconTrash from '../../images/icon-trash.svg';
import IconArrowUp from '../../images/icon-arrow-up.svg';

const Home = () => (
  <div className="flex">
    <div className="w-2/12">
      <div className="flex flex-col h-screen justify-center">
        <div>
          <div className="text-4xl box-border text-center border-2 rounded-2xl m-3 p-3 text-center text-white">
            <IconDraw />
            <br />
            Draw
          </div>
          <div className="text-4xl box-border text-center border-2 rounded-2xl m-3 p-3 text-center text-white">
            <IconErase />
            <br />
            Erase
          </div>
        </div>
      </div>
    </div>
    <div className="flex-grow">
      <div className="pt-6 -mt-4 rounded-2xl bg-blue-light">
        <h1 className="text-white text-center">Design the Waterwall</h1>
      </div>
    </div>
    <div className="w-2/12">
      <div className="flex flex-col h-screen justify-center">
        <div>
          <div className="text-4xl box-border text-left border-2 rounded-2xl m-3 p-3 text-white">
            <IconFlip className="float-left mr-4" style={{ height: '45px' }} />
            Flip
          </div>
          <div className="text-4xl box-border text-left border-2 rounded-2xl m-3 p-3 text-white">
            <IconTrash className="float-left mr-4" style={{ height: '45px' }} />
            Clear
          </div>
          <div className="text-4xl box-border text-left border-2 rounded-2xl m-3 p-3 text-white">
            <IconArrowUp className="float-left mr-4" style={{ height: '45px' }} />
            Share
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Home;
