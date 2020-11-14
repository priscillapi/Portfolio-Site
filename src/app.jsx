import React from 'react';
import './styles/main.scss';

import Header from './sections/Header';
import About from './sections/About';
import Projects from './sections/Projects';
import Footer from './sections/Footer';

const App = () => {
  const Portfolio = (
    <div className='p-portfolio'>
      <Header />
      <About />
      <Projects />
      <Footer />
    </div>
  );

  return Portfolio;
}

export default App;
