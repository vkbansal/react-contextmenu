"use strict";

import React from "react";
import classnames from "classnames";
import _merge from "lodash.merge";

let { PropTypes } = React;

const MenuItem = React.createClass({
    displayName: "MenuItem",
    propTypes: {
        disabled: PropTypes.bool,
        selected: PropTypes.bool,
        divider: PropTypes.bool,
        data: PropTypes.object,
        onSelect: PropTypes.func,
        onClick: PropTypes.func
    },
    getDefaultProps() {
        return {
            disabled: false,
            selected: false,
            data: null
        };
    },
    handleClick(event) {
        let { disabled, onSelect, onClick, currentItem, data } = this.props;

        if (disabled) {
            event.preventDefault();
            return;
        }

        if (typeof onSelect === "function") {
            event.preventDefault();
            onSelect(_merge(currentItem, data));
            this.props.hideMenu();
            return;
        }

        if (typeof onClick === "function") {
            onClick(event, _merge(currentItem, data));
        }

        this.props.hideMenu();
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
