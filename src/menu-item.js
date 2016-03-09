"use strict";

import React from "react";
import classnames from "classnames";
import assign from "object-assign";
import monitor from "./monitor";

let { PropTypes } = React;

const MenuItem = React.createClass({
    displayName: "MenuItem",
    propTypes: {
        onClick: PropTypes.func.isRequired,
        data: PropTypes.object,
        disabled: PropTypes.bool,
        preventClose: PropTypes.bool
    },
    getDefaultProps() {
        return {
            disabled: false,
            data: {}
        };
    },
    handleClick(event) {
        let { disabled, onClick, data, preventClose } = this.props;

        event.preventDefault();

        if (disabled) return;

        assign(data, monitor.getItem());

        if (typeof onClick === "function") {
            onClick(event, data);
        }

        if (preventClose) return;

        monitor.hideMenu();
    },
    render() {
        let { disabled, children } = this.props;

        const classes = classnames({
            "react-context-menu-link": true,
            disabled
        });

        return (
            <div className="react-context-menu-item">
                <a href="#" className={classes} onClick={this.handleClick}>
                    {children}
                </a>
            </div>
        );
    }
});

export default MenuItem;
