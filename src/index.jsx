import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";
import AboutPage from './about';

const aboutPage = document.getElementById('root--about');
if (aboutPage) {
  ReactDOM.render(<AboutPage />, aboutPage);
}

const appPage = document.getElementById('root');
if (appPage) {
  ReactDOM.render(<App/>, appPage);
}

if (module.hot) {
  module.hot.accept();
}
