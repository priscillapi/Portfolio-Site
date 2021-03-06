import React, { Component } from "react";

class ScrollDown extends Component {
    constructor(props) {
        super(props);
        this.onScrollDown = this.onScrollDown.bind(this);
    }

    onScrollDown() {
        let target = '#' + this.props.scrollLocation;
        $('html, body').animate({
            scrollTop: $(target).offset().top
        },1000);
    }

    render() {
        const scrollDown = (
            <div className='c-scroll-down' >
                <a 
                    className='c-scroll-down__link'
                    onClick={() => {this.onScrollDown()}} >
                    <div className='c-scroll-down__arrow'></div>
                    <span className='c-scroll-down__text'>Scroll Down</span>
                </a>
            </div>
        );

      return scrollDown;
    }
}

export default ScrollDown;
