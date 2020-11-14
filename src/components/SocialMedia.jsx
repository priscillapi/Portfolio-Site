import React, { Component } from "react";

class SocialMedia extends Component {
  render() {
      const socialMedia = (
        <div className="c-social-media">
          <a href="https://www.behance.net/_3POINT14_" target="_blank"><i className="fab fa-behance"></i></a>
          <a href="https://dribbble.com/_3POINT14_" target="_blank"><i className="fab fa-dribbble"></i></a>
          <a href="https://twitter.com/_3POINT14_" target="_blank"><i className="fab fa-twitter"></i></a>
          <a href="https://www.linkedin.com/in/priscillapi" target="_blank"><i className="fab fa-linkedin"></i></a>
        </div>
      );
      return socialMedia;
    }
}

export default SocialMedia;
