"use strict";

import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import assign from "object-assign";
import flux from "./flux";
import monitor from "./monitor";

class MenuItem extends Component {
    
    static displayName = "MenuItem";
    
    static propTypes = {
        data: PropTypes.object,
        disabled: PropTypes.bool,
        divider: PropTypes.bool,
        onClick: PropTypes.func,
        onSelect: PropTypes.func,
        selected: PropTypes.bool
    };

    static defaultProps = {
        disabled: false,
        selected: false,
        data: {}
    };

    handleClick(event) {
        let { disabled, onSelect, onClick, data } = this.props;

        if (disabled) {
            event.preventDefault();
            return;
        }

        assign(data, monitor.getItem());

        if (typeof onSelect === "function") {
            event.preventDefault();
            onSelect(data);
            this.hideMenu();
            return;
        }

        if (typeof onClick === "function") {
            onClick(event, data);
        }

        this.hideMenu();
    }

    hideMenu() {
        flux.getActions("menu").setParams({
            isVisible: false,
            currentItem: {}
        });
    }

    render() {
        let { divider, disabled, selected, children } = this.props;

        if (divider) {
            return <li className="divider"/>;
        }

        const classes = classnames({ disabled, active: selected});

        return (
            <li className={classes}>
                <a href="#" onMouseDown={this.handleClick.bind(this)}>
                    {children}
                </a>
            </li>
        );
    }
}

export default MenuItem;
