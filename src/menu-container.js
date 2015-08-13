"use strict";

import React from "react";
import classnames from "classnames";

const MenuContainer = React.createClass({
    displayName: "MenuContainer",
    getInitialState() {
        return {
            position: "fixed",
            left: 0,
            right: 0
        };
    },
    componentDidMount() {
        this.localNode = React.findDOMNode(this.refs.menu);
    },
    componentWillReceiveProps(nextProps) {
        this._unbindHandlers();
        if (nextProps.isVisible) {
            this.setState(this.getMenuPosition(nextProps.x, nextProps.y));
        }
    },
    shouldComponentUpdate(nextProps) {
        return this.props.isVisible !== nextProps.visible;
    },
    componentDidUpdate() {
        if (this.props.isVisible) {
            this._bindHandlers();
        }
    },
    componentWillUnmount() {
        this._unbindHandlers();
        delete this.localNode;
    },
    getMenuPosition(x, y) {
        let menu = React.findDOMNode(this.refs.menu);
        let { screen, scrollX, scrollY } = window,
            { AvailWidth, AvailHeight } = screen,
            { offsetWidth, offsetHeight } = menu,
            menuStyles = {};

        menuStyles.top = y + scrollY;

        if (y + offsetHeight > AvailHeight) {
            menuStyles.top -= offsetHeight;
        }

        menuStyles.left = x + scrollX;

        if (x + offsetWidth > AvailWidth) {
            menuStyles.left -= offsetWidth;
        }

        return menuStyles;
    },
    _outsideClickHandler(event) {
        let localNode = this.localNode,
            source = event.target,
            found = false;

        while (source.parentNode) {
            found = (source === localNode);

            if (found) { return; }

            source = source.parentNode;
        }

        this._hideMenu();
    },
    _hideMenu() {
        this.props.flux.getActions("menu").setParams({
            isVisible: false,
            currentItem: {}
        });
    },
    _bindHandlers() {
        let fn = this._outsideClickHandler,
            fn2 = this._hideMenu;
        document.addEventListener("mousedown", fn);
        document.addEventListener("touchstart", fn);
        window.addEventListener("resize", fn2);
        document.addEventListener("scroll", fn2);
    },
    _unbindHandlers() {
        let fn = this._outsideClickHandler,
            fn2 = this._hideMenu;
        document.removeEventListener("mousedown", fn);
        document.removeEventListener("touchstart", fn);
        window.addEventListener("resize", fn2);
        document.addEventListener("scroll", fn2);
    },
    render() {
        let { currentItem, isVisible, identifier } = this.props;

        const classes = classnames({
            "context-menu": true,
            "open": isVisible === identifier
        });

        return (
            <div className={classes} style={this.state}>
                <ul ref="menu" className="dropdown-menu">
                    {this.props.children}
                </ul>
            </div>
        );
    }
});

export default MenuContainer;
