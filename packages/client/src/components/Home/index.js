import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const Home = () => (
  <div className="flex">
    <div className="w-2/12">
      <div className="flex flex-col h-screen justify-center">
        <div>
          <div className="text-4xl box-border text-center border-2 rounded-lg m-3 p-3 text-center text-white">
            <StaticImage src="https://picsum.photos/seed/draw/200" alt="Lorem" />
            <br />
            Draw
          </div>
          <div className="text-4xl box-border text-center border-2 rounded-lg m-3 p-3 text-center text-white">
            <StaticImage src="https://picsum.photos/seed/erase/200" alt="Lorem" />
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
          <div className="text-4xl box-border text-center border-2 rounded-lg m-3 p-3 text-center text-white">
            <StaticImage src="https://picsum.photos/seed/flip/200/100" alt="Lorem" />
            <br />
            Flip
          </div>
          <div className="text-4xl box-border text-center border-2 rounded-lg m-3 p-3 text-center text-white">
            <StaticImage src="https://picsum.photos/seed/clear/200/100" alt="Lorem" />
            <br />
            Clear
          </div>
          <div className="text-4xl box-border text-center border-2 rounded-lg m-3 p-3 text-center text-white">
            <StaticImage src="https://picsum.photos/seed/share/200/100" alt="Lorem" />
            <br />
            Share
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Home;
