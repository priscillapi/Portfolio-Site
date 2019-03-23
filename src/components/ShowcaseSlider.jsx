import React, { Component } from "react";
import ReactDOM from "react-dom";

import data from "../data/data.json";

class ShowcaseSlider extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: data.showcase,
      totalSlides: data.showcase.length,
      activeSlide: 0,
      nextSlide: 0,
      prevSlide: 0,
      isAnimating: true,
      isMobile: ($(window).width() < 768) ? true : false
    };

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.setNextSlideState = this.setNextSlideState.bind(this);
    this.setPrevSlideState = this.setPrevSlideState.bind(this);
  }

  componentDidMount() {
    this.setNextSlideState();
    this.setPrevSlideState();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.nextSlide === this.state.nextSlide && prevState.prevSlide === this.state.prevSlide){
      this.setNextSlideState();
      this.setPrevSlideState();
    }
  }

  next() {
    // classes should be added for animations
    // these should be triggered by a state(boolean)
    this.setState({
      isAnimating: true,
      activeSlide: this.state.nextSlide
    });
  }

  prev() {
    // classes should be added for animations
    // these should be triggered by a state(boolean)
    this.setState({
      isAnimating: true,
      activeSlide: this.state.prevSlide
    });
  }

  animateSlider() {
    
    
    // very end
    this.setState({
      isAnimating: false
    });
  }

  setNextSlideState() {
    const nextSlide = (this.state.activeSlide + 1);
    const isLastSlide = (nextSlide === this.state.totalSlides);
    return this.setState({
      nextSlide: (isLastSlide) ? 0 : nextSlide
    });
  }

  setPrevSlideState() {
    const prevSlide = (this.state.activeSlide === 0) ? (this.state.totalSlides - 1) : (this.state.activeSlide - 1);
    return this.setState({
      prevSlide: prevSlide
    });
  }

  renderItemBulletPoints(items) {
    const objToArray = Object.keys(items);
    const bulletPoints = objToArray.map(
      (key, index) =>
        items[key].length > 0 ? (
          <li className="c-showcase-slider__bullet-point-item" key={index}>
            <span className="c-showcase-slider__bullet-point-label">{key}:</span>
            {items[key]}
          </li>
        ) : null
    );
    return bulletPoints;
  }
  renderItemRecognitions(items) {
    const recognitions = items.map((item, index) => (
      <li className="c-showcase-slider__recognition-item" key={index}>
        {item}
      </li>
    ));
    return recognitions;
  }
  renderItemTechnologies(items) {
    const technologies = items.map((item, index) => (
      <li className="c-showcase-slider__technology" key={index}>
        {item}
      </li>
    ));
    return technologies;
  }
  renderSupTitle(item, index) {
    const slideNumber = index + 1;
    const supTitle = (
      <h4>{item} {slideNumber} of {this.state.totalSlides}</h4>
    );
    return supTitle;
  }
  renderItemClassNames(index) {
    const modifierClass = (this.state.isMobile) ? "" 
                      :
                      (
                        index === this.state.activeSlide 
                        ? "c-showcase-slider__item--active" 
                        : 
                        index === this.state.nextSlide 
                        ? "c-showcase-slider__item--next" 
                        : 
                        index === this.state.prevSlide 
                        ? "c-showcase-slider__item--prev" 
                        : ""
                      );

    const classList = "c-showcase-slider__item " + modifierClass;
    return classList;
  }

  renderShowcaseSliderClassNames() {
    const animatingClass = (this.state.isAnimating) ? "" 
                      :"a-is-animating";

    const classList = "c-showcase-slider " + animatingClass;
    return classList;
  }

  render() {
    const showcaseSliderArrows = (
      <div className="c-showcase-slider__arrows">
        <div 
          className="c-showcase-slider__arrow c-showcase-slider__arrow--left" 
          onClick={() => {
            this.prev();
          }}
        />
        <div 
          className="c-showcase-slider__arrow c-showcase-slider__arrow--right" 
          onClick={() => {
            this.next();
          }}
        />
      </div>
    );


    const showcaseSliderItems = this.state.data.map((item, index) => (
      <div 
        className={this.renderItemClassNames(index)} 
        key={item.ID}
      >
        <div className="c-showcase-slider__teaser">
          <h3 className="c-showcase-slider__title">{item.title}</h3>
          <div className="c-showcase-slider__image" style={{backgroundImage: 'url("'+ item.image.teaser +'")'}}/>
        </div>
        <div className="c-showcase-slider__content">
          <div className="c-showcase-slider__left">
            <div className="c-showcase-slider__image" style={{backgroundImage: 'url("'+ item.image.main +'")'}}/>
            <div className="c-showcase-slider__cta">
              <div className="c-showcase-slider__title c-showcase-slider__title--sup">
                {this.renderSupTitle(item.supTitle, index)}
              </div>
              <div className="c-showcase-slider__pop-container c-showcase-slider__pop-container--title">
                <h1 className="c-showcase-slider__title">{item.title}</h1>
              </div>
              {/* <div className="c-showcase-slider__pop-container">
                <p className="c-showcase-slider__intro">{item.intro}</p>
                <span class="link-wrapper">
                  <a href={item.link.url} className="c-showcase-slider__link">
                    {item.link.label}
                  </a>
                </span>
              </div> */}
            </div>
            <ul className="c-showcase-slider__technologies">
              {this.renderItemTechnologies(item.technologies)}
            </ul>
          </div>
          <div className="c-showcase-slider__right">
            <ul className="c-showcase-slider__recognitions">
              {this.renderItemRecognitions(item.recognitions)}
            </ul>
            <ul className="c-showcase-slider__bullet-points">
              {this.renderItemBulletPoints(item.bulletPoints)}
            </ul>
            <p className="c-showcase-slider__description">
              {item.description}
              <span className="link-wrapper">
                <a href={item.link.url} className="c-showcase-slider__link">
                  {item.link.label}
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    ));

    const showcaseSlider = (
      <div className={this.renderShowcaseSliderClassNames()}>
        {showcaseSliderItems}
        {showcaseSliderArrows}
      </div>
    );

    return <div>{showcaseSlider}</div>;
  }
}

export default ShowcaseSlider;
