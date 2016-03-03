"use strict";

import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import classnames from "classnames";
import autobind from "autobind-decorator";

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
        this.localNode = findDOMNode(this.refs.menu);
    }

    componentWillReceiveProps(nextProps) {
        this._unbindHandlers();
        if (nextProps.isVisible) {
            const wrapper = 'requestAnimationFrame' in window ? window.requestAnimationFrame : setTimeout;
            wrapper(() => this.setState(this.getMenuPosition(nextProps.x, nextProps.y)));
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
        const menu = findDOMNode(this.refs.menu);
        const scrollX = document.documentElement.scrollTop;
        const scrollY = document.documentElement.scrollLeft;
        const { innerWidth, innerHeight } = window,
            { offsetWidth, offsetHeight } = menu,
            menuStyles = {};

        menuStyles.top = y + scrollY;

        if (y + offsetHeight > innerHeight) {
            menuStyles.top -= offsetHeight;
        }

        menuStyles.left = x + scrollX;

        if (x + offsetWidth > innerWidth) {
            menuStyles.left -= offsetWidth;
        }

        return menuStyles;
    }

    @autobind
    _outsideClickHandler(event) {
        let { isVisible, identifier } = this.props;
        if(isVisible === identifier) {
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
}

export default MenuContainer;
