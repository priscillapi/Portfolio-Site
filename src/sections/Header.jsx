import React from "react";

import ContactInfo from '../components/ContactInfo';
import ScrollText from '../components/ScrollText';
import ScrollDown from '../components/ScrollDown';

const Header = () => {
    const headerSection = (
      <div className='l-section l-section--full-vh l-section--header'>
        <img 
          className='o-logo'
          src='http://priscillapi.com/img/logo.png' />
        <div className='l-container l-container--center-vertical'>
          <ScrollText groupID='d-scroll-text__names' scrollDirection='left' primary='no' />
          <ScrollText groupID='d-scroll-text__technologies' scrollDirection='right' primary='yes' />
          <div className='l-container'>
            <ContactInfo />
          </div>
        </div>
        <ScrollDown />
      </div>
    );

    return headerSection;
}

export default Header;
