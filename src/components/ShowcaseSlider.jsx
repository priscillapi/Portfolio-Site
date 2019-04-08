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
      isMobile: (window.innerWidth <= 768) ? true : false
    };

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.setNextSlideState = this.setNextSlideState.bind(this);
    this.setPrevSlideState = this.setPrevSlideState.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
    this.setNextSlideState();
    this.setPrevSlideState();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.nextSlide === this.state.nextSlide && prevState.prevSlide === this.state.prevSlide){
      this.setNextSlideState();
      this.setPrevSlideState();
    }
    this.animateSlider();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    console.log('onWindowResize');
    if(window.innerWidth <= 768 && !this.state.isMobile) {
      this.setState({
        isMobile: true
      });
    } else if(window.innerWidth > 768 && this.state.isMobile) {
      this.setState({
        isMobile: true
      });
    }
  }

  next() {
    this.animateOut();
    // this.animateSlider();
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

  goToNavItemSelected(slide) {
    // classes should be added for animations
    // these should be triggered by a state(boolean)
    this.setState({
      isAnimating: true,
      activeSlide: slide
    });
  }

  animateSlider() {
    const elementsToAnimate = $('.c-showcase-slider__slide--active .a-slide__ltr');
    const imageToAnimate = $('.c-showcase-slider__slide--active .a-slide__image');
    elementsToAnimate.map((index, element) => {
      $(element).append('<div class="a-slide__ltr--animating-in"></div>');
    });
    $(imageToAnimate).addClass('a-slide__image--reveal');
    setTimeout(() => {
      elementsToAnimate.map((index, element) => {
        const elementsToReveal = $(element).find('.a-slide__content');
        const elementToAnimateOut = $(element).find('.a-slide__ltr--animating-in');
        $(elementToAnimateOut).addClass('a-slide__ltr--animating-out');
        elementsToReveal.map((index, element) => {
          $(element).addClass('a-slide__content--reveal');
        });
      });
      this.removeAnimation();
    }, 700);
  }

  removeAnimation() {
    const animatedElements = $('.a-slide__ltr');
    const prevContentElements = $('.c-showcase-slider__slide--prev .a-slide__content--reveal');
    const nextContentElements = $('.c-showcase-slider__slide--next .a-slide__content--reveal');
    const contentElements = (prevContentElements.length > 0) ? prevContentElements : nextContentElements;
    setTimeout(() => { 
      animatedElements.map((index, element) => {
        $(element).find('.a-slide__ltr--animating-in.a-slide__ltr--animating-out').remove();
      });
      contentElements.map((index, element) => {
        $(element).removeClass('a-slide__content--reveal');
      });
    }, 700);
  }

  animateOut() {

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

  renderNav() {
    const navItems = [];
    for (let i = 0; i < this.state.totalSlides; i++) {
        let slideNumber = (i + 1);
        let modifierClass = (this.state.isMobile) ? "" 
                      :
                      (
                        i === this.state.activeSlide 
                        ? "c-showcase-slider__nav-item--active" 
                        : ""
                      );
        let classList = "c-showcase-slider__nav-item " + modifierClass;
        navItems.push(
            <li 
                className={classList} 
                key={i} 
                onClick={() => {this.goToNavItemSelected(i);}} >
                <span className="c-showcase-slider__nav-indicator"></span>
                {slideNumber}
            </li>
            );
    }
    return navItems;
  }

  renderDetails(items) {
    const objToArray = Object.keys(items);
    const bulletPoints = objToArray.map(
      (key, index) =>
        items[key].length > 0 ? (
          <li className="c-showcase-slider__details-item a-slide__ltr" key={index}>
            <span className="c-showcase-slider__details-label a-slide__content">{key}:</span>
            <span className="a-slide__content">{items[key]}</span>
          </li>
        ) : null
    );
    return bulletPoints;
  }

  renderRecognitions(items) {
    const recognitions = items.map((item, index) => (
      <li className="c-showcase-slider__recognition-item" key={index}>
        {item}
      </li>
    ));
    return recognitions;
  }

  renderTechnologies(items) {
    const technologies = items.map((item, index) => (
      <li className="c-showcase-slider__technology-item a-slide__content" key={index}>
        {item}
      </li>
    ));
    return technologies;
  }

  renderSupTitleNav(item, index) {
    const slideNumber = index + 1;
    const supTitle = (
      <h4>{item} {slideNumber} of {this.state.totalSlides}</h4>
    );
    return supTitle;
  }

  renderSlideClassNames(index, ID) {
    const modifierClass = (this.state.isMobile) ? " c-showcase-slider__slide--active" 
                      :
                      (
                        index === this.state.activeSlide 
                        ? " c-showcase-slider__slide--active" 
                        : 
                        index === this.state.nextSlide 
                        ? " c-showcase-slider__slide--next" 
                        : 
                        index === this.state.prevSlide 
                        ? " c-showcase-slider__slide--prev" 
                        : ""
                      );

    const slideID = "c-showcase-slider__slide-" + ID;

    const classList = "c-showcase-slider__slide " + slideID + modifierClass;
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
          onClick={() => {this.prev();}}
        />
        <div 
          className="c-showcase-slider__arrow c-showcase-slider__arrow--right" 
          onClick={() => {this.next();}}
        />
      </div>
    );


    const showcaseSliderSlides = this.state.data.map((item, index) => (
      <div 
        className={this.renderSlideClassNames(index, item.ID)} 
        key={item.ID}
      >
        <div className="c-showcase-slider__area-nav">
            <ul className="c-showcase-slider__nav">
                {this.renderNav()}
            </ul>
        </div>
        <div className="c-showcase-slider__area-recognitions">
            <ul className="c-showcase-slider__recognitions">
              {this.renderRecognitions(item.recognitions)}
            </ul>
        </div>
        <div className="c-showcase-slider__area-main">
            <div className="c-showcase-slider__container"> 
                <div className="c-showcase-slider__sup-title-nav mobile-only">
                    <span className="c-showcase-slider__sup-title-nav-indicator"></span>
                    {this.renderSupTitleNav(item.supTitle, index)}
                </div>
                <div className="c-showcase-slider__title a-slide__ltr">
                    <h1 className="a-slide__content">{item.title}</h1>
                </div>
                <div className="c-showcase-slider__sub-title a-slide__ltr">
                    <h2 className="a-slide__content">{item.subTitle}</h2>
                </div>
                {showcaseSliderArrows}
            </div>
            <div className="c-showcase-slider__image a-slide__image" style={{backgroundImage: 'url(' + item.image.main + ')'}}></div>
        </div>
        <div className="c-showcase-slider__area-info">
            <ul className="c-showcase-slider__details">
              {this.renderDetails(item.bulletPoints)}
            </ul>
            <p className="c-showcase-slider__description a-slide__ltr">
              <span className="a-slide__content">{item.description}</span>
              <span className="link-wrapper a-slide__content">
                <a href={item.link.url} className="c-showcase-slider__link">
                  {item.link.label}
                </a>
              </span>
            </p>
        </div>
        <div className="c-showcase-slider__area-technologies">
            <ul className="c-showcase-slider__technologies a-slide__ltr">
              {this.renderTechnologies(item.technologies)}
            </ul>
        </div>
      </div>
    ));

    const showcaseSlider = (
      <div className={this.renderShowcaseSliderClassNames()}>
        {showcaseSliderSlides}
      </div>
    );

    return showcaseSlider;
  }
}

export default ShowcaseSlider;
