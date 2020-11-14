import React, { Component } from "react";
import Title from '../components/Title';
import Button from '../components/Button';

class About extends Component {
  constructor(props) {
    super(props);
    console.log('this.props: ', this.props);
  }
  renderClassNames() {
    // const inViewClassName = (this.props.isFullyInViewport || this.props.isAboveViewport) ? " l-section--in-view" : "";
    // const classList = 'l-section l-section--about' + inViewClassName; 
    const inViewClassName = (true) ? " l-section--in-view" : "";
    const classList = 'l-section l-section--about' + inViewClassName; 
    return classList;
  }
  render() {
    const aboutSection = (
      <div id='about' className={this.renderClassNames()} >
        <Title title='About' position='right' />
        <div className='l-container l-container--center-horizontal'>
          <h1>Priscilla Pi</h1>
          <h2>Most just call her Pi [pahy].</h2>
          <h3>Yes, like 3.141592653...</h3>
          <p>She is an honor graduate in Web Design &amp; Interactive Media from Miami International University. Where she won 3rd Year Outstanding Academic Student &amp; Portfolio of the Quarter. Previously she studied Computer Science and is a proud winner of the Academic Excellence Award for Computer Science at Miami Dade College. Priscilla has had the privilege to develop products for companies such as Volkswagen, Sony, Starwood Hotels &amp; many more. She is known to pay attention to detail, having an entrepreneurial mindset, and being a perfectionist. Former Web Developer &amp; Designer at M8 Agency, Front-End Engineer/Designer at NightPro, &amp; Full Stack Developer at Worldmedia Interactive. Currently works for Seminole Hard Rock Hotel &amp; Casino Hollywood as a Front-End Developer.</p>
          <Button href='PriscillaPi-Resume-02202018.pdf' target='_blank' copy='Resume' />
        </div>
      </div>
    );

    return aboutSection;
  }
}

export default About;
