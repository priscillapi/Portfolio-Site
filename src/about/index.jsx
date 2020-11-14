import React from 'react';
import ReactDOM from 'react-dom';
import AboutPage from './about';

ReactDOM.render(
    <AboutPage/>,
    document.getElementById('root--about')
);

if (module.hot) {
  module.hot.accept();
}
