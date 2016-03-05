"use strict";

import React from "react";
import classnames from "classnames";
import assign from "object-assign";
import monitor from "./monitor";

let { PropTypes } = React;

const MenuItem = React.createClass({
    displayName: "MenuItem",
    propTypes: {
        data: PropTypes.object,
        disabled: PropTypes.bool,
        divider: PropTypes.bool,
        selected: PropTypes.bool,
        onClick: PropTypes.func,
        onSelect: PropTypes.func
    },
    contextTypes: {
        store: PropTypes.object.isRequired
    },
    defaultProps: {
        disabled: false,
        selected: false,
        data: {}
    },
    handleClick(event) {
        let { disabled, onSelect, onClick, data } = this.props;

        if (disabled) return event.preventDefault();

        assign(data, monitor.getItem());

        if (typeof onSelect === "function") {
            event.preventDefault();
            onSelect(data);
            return this.hideMenu();
        }

        if (typeof onClick === "function") {
            onClick(event, data);
        }

        this.hideMenu();
    },
    hideMenu() {
        this.context.store.dispatch({
            type: "SET_PARAMS",
            data: {
                isVisible: false,
                currentItem: {}
            }
        });
    },
    render() {
        let { divider, disabled, selected, children } = this.props;

        if (divider) {
            return <li className="divider"/>;
        }

        const classes = classnames({ disabled, active: selected});

        return (
            <li className={classes}>
                <a href="#" onMouseDown={this.handleClick}>
                    {children}
                </a>
            </li>
        );
    }
});

export default MenuItem;
