/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './pages/Home';
import ChangeSize from './pages/ChangeSize';
import RealWorld from './pages/RealWorld';

const routes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/change-size/" component={ChangeSize} />
    <Route path="/real-world/" component={RealWorld} />
  </Route>
);

export default routes;
