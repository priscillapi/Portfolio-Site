import React, { Component } from "react";

import SocialMedia from './SocialMedia';

class ContactInfo extends Component {
  render() {
      const contactInfo = (
        <div className="c-contact-info">
          <p><a href="tel:954-305-2242">954.305.2242</a> | <a href="mailto:pi@priscillapi.com">pi@priscillapi.com</a> | Miami, FL | New York, NY</p>
          <SocialMedia />
        </div>
      );
      return contactInfo;
    }
}

export default ContactInfo;
