import React, { Component } from "react";

class ContactInfo extends Component {
  render() {
      const contactInfo = (
        <div className="c-contact-info">
          <p><a href="tel:954-305-2242">954.305.2242</a> | <a href="mailto:pi@3point14.tech">pi@3point14.tech</a> | Miami, FL | New York, NY</p>
        </div>
      );
      return contactInfo;
    }
}

export default ContactInfo;
