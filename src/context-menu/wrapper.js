"use strict";

import React from "react";
import monitor from "../monitor";

import Modal from "react-overlays/lib/Modal";

const modalStyle = {
        position: "fixed",
        zIndex: 1040,
        top: 0, bottom: 0, left: 0, right: 0
    },
    backdropStyle = {
        ...modalStyle,
        zIndex: "auto",
        backgroundColor: "transparent"
    },
    menuStyles = {
        position: "fixed",
        zIndex: "auto"
    };

const ContextMenuWrapper = React.createClass({
    displayName: "ContextMenuWrapper",
    getInitialState() {
        return {
            left: 0,
            top: 0
        };
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.isVisible) {
            const wrapper = window.requestAnimationFrame || setTimeout;

            wrapper(() => this.setState(this.getMenuPosition(nextProps.x, nextProps.y)));
        }
    },
    shouldComponentUpdate(nextProps) {
        return this.props.isVisible !== nextProps.visible;
    },
    getMenuPosition(x, y) {
        let scrollX = document.documentElement.scrollTop,
            scrollY = document.documentElement.scrollLeft,
            { innerWidth, innerHeight } = window,
            rect = this.menu.getBoundingClientRect(),
            menuStyles = {
                top: y + scrollY,
                left: x + scrollX
            };

        if (y + rect.height > innerHeight) {
            menuStyles.top -= rect.height;
        }

        if (x + rect.width > innerWidth) {
            menuStyles.left -= rect.width;
        }

        return menuStyles;
    },
    render() {
        let { isVisible, identifier, children } = this.props;

        const style = {
            ...menuStyles,
            ...this.state
        };

        return (
            <Modal style={modalStyle} backdropStyle={backdropStyle}
                show={isVisible === identifier} onHide={() => monitor.hideMenu()}>
                <nav ref={(c) => (this.menu = c)} style={style}
                    className="react-context-menu">
                    {children}
                </nav>
            </Modal>
        );
    }
});

export default ContextMenuWrapper;
