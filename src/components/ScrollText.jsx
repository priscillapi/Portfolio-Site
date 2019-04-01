import React, { Component } from "react";
import data from "../data/data.json";

class ScrollText extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: data.scrollText,
        };
    }

    renderClassNames() {
        const directionModifierClass = "a-scroll--" + this.props.scrollDirection;
        const primaryModifierClass = (this.props.primary === 'yes') ? " c-scroll-text__wrapper--primary" : "";
        const classList = "c-scroll-text__wrapper" + primaryModifierClass + " a-scroll " + directionModifierClass;
        return classList;
    }

    renderItems() {
        let items = [];
        this.state.data.map((scrollGroup) => {
            if(scrollGroup.ID === this.props.groupID) {
                items = scrollGroup.items.map((item, index) => (
                    <div className="c-scroll-text__item" key={index}>
                        {item}
                    </div>
                ));
            }
        });
        return items;
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
