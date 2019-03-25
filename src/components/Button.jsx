import React, { Component } from "react";

class Button extends Component {
  render() {
      const button = (
        <div className='c-button'>
          <a href={this.props.href} target={this.props.target}>{this.props.copy}</a>
        </div>
      );
      return button;
    }
}

export default Button;
