/* eslint-disable react/prop-types */
import React from 'react';
import Header from './components/Header';

const App = ({ children }) => (
  <div>
    <Header />
    <div className="content">
      {children}
    </div>
  </div>
);

export default App;
