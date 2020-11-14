import React from "react";

import SocialMedia from '../components/SocialMedia';


const Footer = () => {
    const footerSection = (
      <div className='l-section l-section--no-margin l-section--no-padding l-section--footer'>
        <div className='l-container l-container--center-horizontal'>
          <p>&copy; COPYRIGHT 2019 PRISCILLA PI. <span>ALL RIGHTS RESERVED</span></p>
          <SocialMedia />
        </div>
      </div>
    );

    return footerSection;
}

export default Footer;
