import React, { Component } from "react";
import Title from '../components/Title';
import ShowcaseSlider from '../components/ShowcaseSlider';

class Projects extends Component {
  constructor(props) {
    super(props);
  }
  renderClassNames() {
    // const inViewClassName = (this.props.isFullyInViewport || this.props.isAboveViewport) ? " l-section--in-view" : "";
    // const classList = 'l-section l-section--projects' + inViewClassName; 
    const inViewClassName = (true) ? " l-section--in-view" : "";
    const classList = 'l-section l-section--projects' + inViewClassName; 
    return classList;
  }
  render() {
    const projectsSection = (
      <div className={this.renderClassNames()}>
        <Title title='Projects' position='left' />
        <ShowcaseSlider />
      </div>
    );

    return projectsSection;
  }
}

export default Projects;
