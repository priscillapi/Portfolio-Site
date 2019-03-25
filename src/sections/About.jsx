import React from "react";
import Title from '../components/Title';
import Button from '../components/Button';

const About = () => {
    const aboutSection = (
      <div className='l-section l-section--about'>
        <Title title='About' position='right'/>
        <div className='l-container'>
          <h1>Priscilla Pi</h1>
          <h3>Most just call her Pi [pahy].</h3>
          <h3 className="pop">Yes, like 3.141592653...</h3>
          <p>She is an honor graduate in Web Design &amp; Interactive Media from Miami International University. Where she won 3rd Year Outstanding Academic Student &amp; Portfolio of the Quarter. Previously she studied Computer Science and is a proud winner of the Academic Excellence Award for Computer Science at Miami Dade College. Priscilla has had the privilege to develop products for companies such as Volkswagen, Sony, Starwood Hotels &amp; many more. She is known to pay attention to detail, having an entrepreneurial mindset, and being a perfectionist. Former Web Developer &amp; Designer at M8 Agency &amp; currently works for NightPro as a Front-End Engineer.</p>
          <Button href='Priscilla-Pi_Resume.pdf' target='_blank' copy='Resume' />
        </div>
      </div>
    );

    return aboutSection;
}

export default About;
