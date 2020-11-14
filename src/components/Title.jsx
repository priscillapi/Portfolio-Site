import React, { Component } from "react";
import ScrollMonitor from 'react-scrollmonitor';
import ReactDOM from "react-dom";

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inView: false
    };
    this.renderClassNames = this.renderClassNames.bind(this);
  }

  handleViewport(inView) {
    this.setState({
      inView: inView
    });
  }

  renderClassNames() {
    const inViewClassName = (this.state.inView) ? "c-title--in-view " : "";
    const classList = "c-title " + inViewClassName + "c-title--" + this.props.position; 
    return classList;
  }
  render() {
    return (
        <div className={this.renderClassNames()}>
          <ScrollMonitor
            fullyEnterViewport={() => this.handleViewport(true)}
            exitViewport={() => this.handleViewport(false)}>
            <h1>{this.props.title}</h1>
          </ScrollMonitor>
        </div>
    );
  }
}

export default Title;
