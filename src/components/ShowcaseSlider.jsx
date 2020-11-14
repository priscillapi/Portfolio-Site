import React, { Component } from "react";
import ScrollMonitor from 'react-scrollmonitor';
import ReactResizeDetector from 'react-resize-detector';
import "react-dom";

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
      progressActivated: false,
      inProgress: false,
      isMobile: (window.innerWidth <= 768)
    };

    this.viewport = (window.innerWidth <= 768) ? 'mobile' : 'desktop';

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.setNextSlideState = this.setNextSlideState.bind(this);
    this.setPrevSlideState = this.setPrevSlideState.bind(this);
    this.activateProgress = this.activateProgress.bind(this);
    
    this.updateViewport = this.updateViewport.bind(this);
    this.inView = this.inView.bind(this);
    this.outOfView = this.outOfView.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    // this.onWindowScroll = this.onWindowScroll.bind(this);
  }

  componentDidMount() {
    this.setNextSlideState();
    this.setPrevSlideState();

    // window.addEventListener('resize', this.onWindowResize.bind(this));
    // window.addEventListener('scroll', this.onWindowScroll);
  }
  componentDidUpdate(prevProps, prevState) {
    // window.addEventListener('resize', this.onWindowResize.bind(this));

    if (prevState.nextSlide === this.state.nextSlide && prevState.prevSlide === this.state.prevSlide){
      this.setNextSlideState();
      this.setPrevSlideState();
    }

    this.animateSlider();
  }
  componentWillUnmount() {
    // window.removeEventListener('resize', this.onWindowResize);
    // window.removeEventListener('scroll', this.onWindowScroll);
  }

  onWindowResize() {
    console.log('onWindowResize');

    (window.innerWidth <= 768) ? (
      this.viewportSize = 'mobile'
    ) : (
      this.viewportSize = 'desktop'
    );

    // this.updateViewport(this.viewportSize);
  }

  onWindowScroll() {
    const eleOffsetTop = $('.l-section--projects .c-title').offset().top;
    const eleOuterHeight = $('.l-section--projects .c-title').outerHeight();
    const windowHeight = $(window).height();
    const windowScroll = $(window).scrollTop();
    const desiredElePosition = (windowHeight * 0.4);
    const elePositionLocation = (eleOffsetTop + eleOuterHeight);
    const eleWindowScrollPosition = (elePositionLocation - desiredElePosition);

   if ((windowScroll > eleWindowScrollPosition) && !this.state.progressActivated){
    // console.log('you have scrolled to projects!');
    
    // this.setState({
    //   progressActivated: true
    // });
    this.activateProgress();
    }
  }

  inView() {
    // this.setState({
    //   progressActivated: true
    // });
    // this.activateProgress();
  }

  outOfView() {
    // this.setState({
    //   progressActivated: false,
    //   inProgress: false
    // });
  }

  updateViewport(size) {
    console.log('updateViewport');
    console.log('size: ', size);
    console.log('this.state.isMobile: ', this.state.isMobile);
    console.log("(size === 'mobile'): ", (size === 'mobile'));
    console.log("!(this.state.isMobile): ", !(this.state.isMobile));
    console.log("(size === 'desktop'): ", (size === 'desktop'));
    console.log("(this.state.isMobile): ", (this.state.isMobile));
    console.log(": ", );


    if ((size === 'mobile') && !(this.state.isMobile)) {
      this.setState({
        isMobile: true
      });
    } else if ((size === 'desktop') && (this.state.isMobile)) {
      this.setState({
        isMobile: false
      });
    }
  }

  activateProgress() {
    console.log('activateProgress()');
    // setState({
    //   inProgress: true
    // });
    if(this.viewport !== 'mobile') {
      const elem = $('.c-showcase-slider__slide--active .c-showcase-slider__nav-item--active .c-showcase-slider__nav-progress')[0]; 
      let progress = 0;
      let id = setInterval(() => {
        if (progress >= 100) {
          console.log('activateProgress() in if');
          clearInterval(id);
          $(elem).removeAttr("style");
          this.next();
        } else {
          console.log('activateProgress() in else');
          progress += 20; 
          elem.style.width = progress + '%'; 
        }
      }, 1000);
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
    // this.activateProgress();
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
        let modifierClass = (this.viewport === 'mobile') ? "" 
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
                <div className="c-showcase-slider__nav-indicator">
                  <div className="c-showcase-slider__nav-progress"></div>
                </div>
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
          <li className="c-showcase-slider__detail-item a-slide__ltr" key={index}>
            <span className="c-showcase-slider__detail-label a-slide__content">{key}:</span>
            <span className="c-showcase-slider__detail-content a-slide__content">{items[key]}</span>
          </li>
        ) : null
    );
    return bulletPoints;
  }

  renderRecognitions(items) {
    let recognitions = [];
    for (let i = 0; i < items.length; i++) {
      recognitions.push(
        <a href={items[i].url} target="_blank" className="c-showcase-slider__recognition-item">
          <img src={items[i].image} className="a-slide__content" />
        </a>
      );
    }
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

  renderHighlights(items) {
    const highlights = items.map((item, index) => (
      <li className="c-showcase-slider__highlight-item a-slide__ltr" key={index}>
        <span className="a-slide__content">{item}</span>
      </li>
    ));
    return highlights;
  }

  renderLinks(items) {
    let links = [];
    for (let i = 0; i < items.length; i++) {
      links.push(
        <span className="c-showcase-slider__link-item-wrapper link-wrapper a-slide__ltr">
          <a href={items[i].url} className="c-showcase-slider__link-item a-slide__content" target="_blank">
            {items[i].label}
          </a>
        </span>
      );
    }
    return links;
  }

  renderSupTitleNav(item, index) {
    const slideNumber = index + 1;
    const supTitle = (
      <h4>{item} {slideNumber} of {this.state.totalSlides}</h4>
    );
    return supTitle;
  }

  renderRecognitionsClassNames(recognitions) {
    const hideSection = (recognitions.length > 0) ? "" : " c-showcase-slider__hide";
    const classList = "c-showcase-slider__area-recognitions" + hideSection;
    return classList;
  }

  renderSlideClassNames(index, ID) {
    const modifierClass = (this.viewport === 'mobile') ? " c-showcase-slider__slide--active" 
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
        <div className={this.renderRecognitionsClassNames(item.recognitions)}>
            <div className="c-showcase-slider__recognitions a-slide__ltr">
              {this.renderRecognitions(item.recognitions)}
            </div>
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
            <div className="c-showcase-slider__image-wrapper">
              <div className="c-showcase-slider__image a-slide__image" style={{backgroundImage: 'url(' + item.image.main + ')'}}></div>
            </div>
        </div>
        <div className="c-showcase-slider__area-info">
            <ul className="c-showcase-slider__info c-showcase-slider__info-details">
              {this.renderDetails(item.bulletPoints)}
            </ul>
            <p className="c-showcase-slider__info c-showcase-slider__info-description a-slide__ltr">
              <span className="a-slide__content">{item.description}</span>
            </p>
            <div className="c-showcase-slider__info c-showcase-slider__info-highlights">
              <div className="c-showcase-slider__info-highlights-title a-slide__ltr">
                <span className="a-slide__content">Highlights:</span>
              </div>
              <ul className="c-showcase-slider__highlights">
                {this.renderHighlights(item.highlights)}
              </ul>
            </div>
            <span className="c-showcase-slider__info c-showcase-slider__info-links">
              {this.renderLinks(item.links)}
            </span>
        </div>
        <div className="c-showcase-slider__area-technologies">
            <ul className="c-showcase-slider__technologies a-slide__ltr">
              {this.renderTechnologies(item.technologies)}
            </ul>
        </div>
      </div>
    ));

    const showcaseSlider = (
      <ReactResizeDetector skipOnMount handleWidth onResize={() => {this.onWindowResize()}}>
        <div className={this.renderShowcaseSliderClassNames()}>
          <ScrollMonitor
            enterViewport={() => {this.inView();}}
            exitViewport={() => {this.outOfView();}}>
            <div className="c-showcase-slider__wrapper">{showcaseSliderSlides}</div>
          </ScrollMonitor>
        </div>
      </ReactResizeDetector>
    );

    return showcaseSlider;
  }
}

export default ShowcaseSlider;
