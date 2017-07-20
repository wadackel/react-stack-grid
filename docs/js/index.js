/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import routes from './routes';


const render = (nextRoutes) => {
  ReactDOM.render(
    <AppContainer>
      <Root routes={nextRoutes} />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const nextRoutes = require('./routes').default;
    render(nextRoutes);
  });
}
