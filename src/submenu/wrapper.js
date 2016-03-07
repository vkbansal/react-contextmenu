"use strict";

import React from "react";

const SubMenuWrapper = React.createClass({
    displayName: "SubMenuWrapper",
    getInitialState() {
        return {
            position: {
                top: true,
                right: true
            }
        };
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.visible) {
            const wrapper = window.requestAnimationFrame || setTimeout;

            wrapper(() => {
                this.setState(this.getMenuPosition());
                this.forceUpdate();
            });
        } else {
            this.setState(this.getInitialState());
        }
    },
    shouldComponentUpdate(nextProps) {
        return this.props.visible !== nextProps.visible;
    },
    getMenuPosition() {
        let { innerWidth, innerHeight } = window,
            rect = this.menu.getBoundingClientRect(),
            position = {};


        if (rect.bottom > innerHeight) {
            position.bottom = true;
        } else {
            position.top = true;
        }

        if (rect.right > innerWidth) {
            position.left = true;
        } else {
            position.right = true
        }

        return { position };
    },
    getPositionStyles() {
        let style = {},
            { position } = this.state;

        if (position.top) style.top = 0;
        if (position.bottom) style.bottom = 0;
        if (position.right) style.left = "100%";
        if (position.left) style.right = "100%";

        return style;
    },
    render() {
        let { children, visible } = this.props;

        const style = {
            display: visible ? "block" : "none",
            position: "absolute",
            ...this.getPositionStyles()
        };

        return (
            <nav ref={(c) => (this.menu = c)} style={style} className="react-context-menu">
            {children}
            </nav>
        );
    }
});

export default SubMenuWrapper;
