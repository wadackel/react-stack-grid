/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1><img src="./images/logo.png" alt="React Stack Grid" /></h1>
        <nav>
          <ul>
            <li><IndexLink to="/" activeClassName="is-active">Home</IndexLink></li>
            <li><Link to="/real-world/" activeClassName="is-active">Real World</Link></li>
            <li><a href="https://github.com/tsuyoshiwada/react-stack-grid">GitHub</a></li>
          </ul>
        </nav>
      </header>
    );
  }
}
