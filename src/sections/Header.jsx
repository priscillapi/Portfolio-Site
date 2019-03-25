import React from "react";

import ContactInfo from '../components/ContactInfo';

const Header = () => {
    const headerSection = (
      <div className='l-section l-section--header'>
        <div className='l-container l-container--full-width'>
          <h1>Priscilla Pi</h1>
          <h2>Frontend Developer</h2>
          <ContactInfo />
        </div>
      </div>
    );

    return headerSection;
}

export default Header;
