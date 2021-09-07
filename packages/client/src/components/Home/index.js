import React from 'react';
import IconDraw from '../../images/icon-draw.svg';
import IconErase from '../../images/icon-erase.svg';
import IconFlip from '../../images/icon-flip.svg';
import IconTrash from '../../images/icon-trash.svg';
import IconArrowUp from '../../images/icon-arrow-up.svg';

const Home = () => (
  <div className="flex">
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
    <div className="flex-grow">
      <div className="pt-6 -mt-4 rounded-2xl bg-blue-light">
        <h1 className="text-white text-center">Design the Waterwall</h1>
      </div>
    </div>
    <div className="w-2/12 relative">
      <div className="mx-12 relative">
        <div className="flex flex-col justify-center h-screen">
          <div className="text-4xl text-center border-2 rounded-2xl my-3 mt-28 p-3 text-white relative">
            <IconFlip className="absolute left-5 bottom-2" style={{ height: '45px' }} />
            Flip
          </div>
          <div className="text-4xl text-center border-2 rounded-2xl my-3 p-3 text-white relative">
            <IconTrash className="absolute left-5 bottom-2" style={{ height: '45px' }} />
            Clear
          </div>
        </div>
        <div className="absolute w-full bottom-20 text-4xl text-center border-2 rounded-2xl p-3 text-blue bg-white">
          <IconArrowUp
            className="absolute left-5 bottom-2 float-left mr-4"
            style={{ height: '45px' }}
          />
          Share
        </div>
      </div>
    </div>
  </div>
);
export default Home;
