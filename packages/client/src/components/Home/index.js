import React from 'react';

const Home = () => (
  <div className="flex flex-row flex-initial">
    <div className="w-2/12 bg-white">
      <div className="flex-col h-screen">
        <div>Draw</div>
        <div>Erase</div>
      </div>
    </div>
    <div className="flex-grow">
      <div className="pt-6 -mt-4 rounded-2xl bg-blue-light">
        <h1 className="text-white text-center">Design the Waterwall</h1>
      </div>
    </div>
    <div className="w-2/12 bg-white">
      <div className="flex-col">
        <div>Flip</div>
        <div>Clear</div>
        <div>Share</div>
      </div>
    </div>
  </div>
);
export default Home;
