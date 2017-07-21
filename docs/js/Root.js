/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Router, hashHistory } from 'react-router';

const Root = ({ routes }) => (
  <Router history={hashHistory}>
    {routes()}
  </Router>
);

export default Root;
