import React, { Component } from "react";
import ReactDOM from "react-dom";

class Title extends Component {
  constructor(props) {
    super(props);
  }

  renderClassNames(position) {
    console.log('title: render class names:');
    const classList = "c-title c-title--in-view c-title--" + position; 
    return classList;
  }
  render() {
    return (
        <div className={this.renderClassNames(this.props.position)}>
          <h1>{this.props.title}</h1>
        </div>
    );
  }
}

export default Title;
