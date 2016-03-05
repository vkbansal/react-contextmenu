"use strict";

import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";

const MenuContainer = React.createClass({
    displayName: "MenuContainer",
    contextTypes: {
        store: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            position: "fixed",
            left: 0,
            right: 0
        };
    },
    componentDidMount() {
        this.localNode = ReactDOM.findDOMNode(this.refs.menu);
    },
    componentWillReceiveProps(nextProps) {
        this._unbindHandlers();
        if (nextProps.isVisible) {
            const wrapper = 'requestAnimationFrame' in window ? window.requestAnimationFrame : setTimeout;
            wrapper(() => this.setState(this.getMenuPosition(nextProps.x, nextProps.y)));
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
        let menu = ReactDOM.findDOMNode(this.refs.menu),
            scrollX = document.documentElement.scrollTop,
            scrollY = document.documentElement.scrollLeft,
            { innerWidth, innerHeight } = window,
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
    },
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
    },
    _hideMenu() {
        this.context.store.dispatch({
            type: "SET_PARAMS",
            data: {
                isVisible: false,
                currentItem: {}
            }
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
        window.removeEventListener("resize", fn2);
        document.removeEventListener("scroll", fn2);
    },
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
});

export default MenuContainer;
