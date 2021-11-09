import React from 'react';
import WaterWall from '@components/WaterWall';
import { Router } from '@reach/router';

const App = () => (
  <Router basepath="/app">
    <WaterWall default />
  </Router>
);
export default App;
