"use strict";

import React from "react";
import classnames from "classnames";

import MenuWrapper from "./menu";

const menuStyles = {
    position: "relative",
    zIndex: "auto"
};

const SubMenu = React.createClass({
    displayName: "SubMenu",
    getInitialState() {
        return {
            visible: false
        };
    },
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isVisible !== nextState.visible;
    },
    handleClick(e) {
        e.preventDefault();

        if (this.props.disabled) return;

        this.setState((state) => ({visible: !state.visible}));
    },
    render() {
        let { disabled, children, title } = this.props,
            { visible } = this.state;

        const classes = classnames({
                "react-context-menu-link": true,
                disabled,
                active: visible
            }),
            menuClasses = "react-context-menu-item submenu";

        return (
            <div ref={(c) => (this.item = c)} className={menuClasses} style={menuStyles}>
                <a href="#" className={classes} onClick={this.handleClick}>
                    {title}
                </a>
                <MenuWrapper visible={visible}>
                {children}
                </MenuWrapper>
            </div>
        );
    }
});

export default SubMenu;
