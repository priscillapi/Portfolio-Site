import React from 'react';
import './styles/main.scss';

import Header from './sections/Header';
import About from './sections/About';
import Projects from './sections/Projects';

const App = () => {
  const Portfolio = (
    <div className='p-portfolio'>
      <Header />
      <About />
      <Projects />
    </div>
  );

  return Portfolio;
}

export default App;
