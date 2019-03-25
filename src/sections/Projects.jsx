import React from "react";
import Title from '../components/Title';
import ShowcaseSlider from '../components/ShowcaseSlider';

const Projects = () => {
    const projectsSection = (
      <div className='l-section l-section--projects'>
        <Title title='Projects' position='left'/>
        <ShowcaseSlider />
      </div>
    );

    return projectsSection;
}

export default Projects;
