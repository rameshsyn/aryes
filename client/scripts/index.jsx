import React from 'react';
import { render } from 'react-dom';
import Routes from './routes';


// Hot Reload
if (module.hot) module.hot.accept();

const Main = () => (
  <Routes />
);

render(<Main />, document.getElementById('app'));

