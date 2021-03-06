import React, { Component } from "react";
import data from "../data/data.json";

class ScrollText extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: data.scrollText,
        };
        this.renderWrapperWidth = this.renderWrapperWidth.bind(this);
    }

    componentDidMount() {
        this.renderWrapperWidth();
    }

    renderWrapperWidth() {
        const scrollTextWrappers = $('.c-scroll-text__wrapper');
        scrollTextWrappers.map((index, wrapper) => {
            let wrapperWidth = wrapper.clientWidth;
            $(wrapper).width(wrapperWidth);
        });
    }

    renderClassNames() {
        const directionModifierClass = "c-scroll-text__wrapper--" + this.props.scrollDirection;
        const primaryModifierClass = (this.props.primary === 'yes') ? " c-scroll-text__wrapper--primary" : "";
        const classList = "c-scroll-text__wrapper" + primaryModifierClass + " a-scroll " + directionModifierClass;
        return classList;
    }

    renderItems() {
        console.log(this.state);
        let items = [];
        this.state.data.map((scrollGroup) => {
            if(scrollGroup.ID === this.props.groupID) {
                let scrollGroupItems = (scrollGroup.ID === "d-scroll-text__technologies") ? scrollGroup.items.reverse() : scrollGroup.items;
                items = scrollGroupItems.map((item, index) => (
                    <div className="c-scroll-text__item">
                        <span>{item}</span>
                    </div>
                ));
            }
        });
        return items.concat(items).concat(items);
    }

    render() {
        const scrollText = (
            <div className='c-scroll-text' >
                <div className={this.renderClassNames()}>
                    {this.renderItems()}
                </div>
            </div>
        );

      return scrollText;
    }
}

export default ScrollText;
