"use strict";

import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import autobind from "autobind-decorator";

let { Component } = React;

class MenuContainer extends Component {

    static displayName = "MenuContainer";

    constructor(props) {
        super(props);

        this.state = {
            position: "fixed",
            left: 0,
            right: 0
        };
    }

    componentDidMount() {
        this.localNode = ReactDOM.findDOMNode(this.refs.menu);
    }

    componentWillReceiveProps(nextProps) {
        this._unbindHandlers();
        if (nextProps.isVisible) {
            this.setState(this.getMenuPosition(nextProps.x, nextProps.y));
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.isVisible !== nextProps.visible;
    }

    componentDidUpdate() {
        if (this.props.isVisible) {
            this._bindHandlers();
        }
    }

    componentWillUnmount() {
        this._unbindHandlers();
        delete this.localNode;
    }

    @autobind
    getMenuPosition(x, y) {
        let menu = ReactDOM.findDOMNode(this.refs.menu),
            scrollX = document.documentElement.scrollTop,
            scrollY = document.documentElement.scrollLeft,
            { screen } = window,
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
    }

    @autobind
    _outsideClickHandler(event) {
        let { isVisible, identifier } = this.props;

        if (isVisible === identifier) {
            let localNode = this.localNode,
                source = event.target,
                found = false;

            while (source.parentNode) {
                found = (source === localNode);

                if (found) { return; }

                source = source.parentNode;
            }

            this._hideMenu();
        }
    }

    @autobind
    _hideMenu() {
        this.props.flux.getActions("menu").setParams({
            isVisible: false,
            currentItem: {}
        });
    }

    @autobind
    _bindHandlers() {
        let fn = this._outsideClickHandler,
            fn2 = this._hideMenu;

        document.addEventListener("mousedown", fn);
        document.addEventListener("touchstart", fn);
        window.addEventListener("resize", fn2);
        document.addEventListener("scroll", fn2);
    }

    @autobind
    _unbindHandlers() {
        let fn = this._outsideClickHandler,
            fn2 = this._hideMenu;

        document.removeEventListener("mousedown", fn);
        document.removeEventListener("touchstart", fn);
        window.removeEventListener("resize", fn2);
        document.removeEventListener("scroll", fn2);
    }

    render() {
        let { isVisible, identifier } = this.props;

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
}

export default MenuContainer;
