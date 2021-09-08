import React from 'react';
import SidebarLeft from '@components/SidebarLeft';
import SidebarRight from '@components/SidebarRight';
import Drawing from '@components/DrawingArea';

const Home = () => (
  <div className="flex">
    <SidebarLeft />
    <div className="flex-grow">
      <div className="pt-6 -mt-4 rounded-2xl bg-blue-light">
        <h1 className="text-white text-center">Design the Waterwall</h1>
      </div>
      <Drawing />
    </div>
    <SidebarRight />
  </div>
);
export default Home;
