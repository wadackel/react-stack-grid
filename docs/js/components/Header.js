/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { IndexLink, Link } from 'react-router';

const Header = () => (
  <header className="header">
    <h1><img src="./images/logo.png" alt="React Stack Grid" /></h1>
    <nav>
      <ul>
        <li><IndexLink to="/" activeClassName="is-active">Home</IndexLink></li>
        <li><Link to="/change-size/" activeClassName="is-active">Change Size</Link></li>
        <li><Link to="/real-world/" activeClassName="is-active">Real World</Link></li>
        <li><a href="https://github.com/tsuyoshiwada/react-stack-grid">GitHub</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;
