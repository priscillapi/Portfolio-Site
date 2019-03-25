import React, { Component } from "react";
import ReactDOM from "react-dom";

class Title extends Component {
  renderClassNames(position) {
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
