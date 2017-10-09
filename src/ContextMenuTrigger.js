import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import assign from 'object-assign';

import { showMenu, hideMenu } from './actions';
import { callIfExists, cssClasses } from './helpers';

export default class ContextMenuTrigger extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        attributes: PropTypes.object,
        collect: PropTypes.func,
        disable: PropTypes.bool,
        holdToDisplay: PropTypes.number,
        posX: PropTypes.number,
        posY: PropTypes.number,
        renderTag: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.func
        ]),
        disableIfShiftIsPressed: PropTypes.bool
    };

    static defaultProps = {
        attributes: {},
        collect() { return null; },
        disable: false,
        holdToDisplay: 1000,
        renderTag: 'div',
        posX: 0,
        posY: 0,
        disableIfShiftIsPressed: false
    };

    componentWillUnmount = () => {
        this.abortTimer();
    }

    touchHandled = false;
    touchstartTimeoutId = null;

    abortTimer = () => {
        if (this.touchstartTimeoutId !== null) {
            clearTimeout(this.touchstartTimeoutId);
            this.touchstartTimeoutId = null;
        }
    }

    handleTouchstart = (event) => {
        this.touchHandled = false;

        if (this.props.holdToDisplay >= 0) {
            event.persist();
            event.stopPropagation();

            this.touchstartTimeoutId = setTimeout(
                () => {
                    this.handleContextClick(event);
                    this.touchHandled = true;
                    this.touchstartTimeoutId = null;
                },
                this.props.holdToDisplay
            );
        }
        callIfExists(this.props.attributes.onTouchStart, event);
    }

    handleTouchMove = (event) => {
        if (this.touchHandled) {
            hideMenu();
        } else {
            this.abortTimer();
        }
        callIfExists(this.props.attributes.onTouchMove, event);
    }

    handleTouchCancel = (event) => {
        if (this.touchHandled) {
            hideMenu();
        } else {
            this.abortTimer();
        }
        callIfExists(this.props.attributes.onTouchCancel, event);
    }

    handleTouchEnd = (event) => {
        if (!this.touchHandled) {
            this.abortTimer();
        }
        callIfExists(this.props.attributes.onTouchEnd, event);
    }

    handleContextMenu = (event) => {
        this.handleContextClick(event);
        callIfExists(this.props.attributes.onContextMenu, event);
    }

    handleContextClick = (event) => {
        if (this.props.disable) return;
        if (this.props.disableIfShiftIsPressed && event.shiftKey) return;

        event.preventDefault();
        event.stopPropagation();

        let x = event.clientX || (event.touches && event.touches[0].pageX);
        let y = event.clientY || (event.touches && event.touches[0].pageY);

        if (this.props.posX) {
            x -= this.props.posX;
        }
        if (this.props.posY) {
            y -= this.props.posY;
        }

        hideMenu();

        let data = callIfExists(this.props.collect, this.props);
        let showMenuConfig = {
            position: { x, y },
            target: this.elem,
            id: this.props.id
        };
        if (data && (typeof data.then === 'function')) {
            // it's promise
            data.then((resp) => {
                showMenuConfig.data = assign({}, resp, {
                    target: event.target
                });
                showMenu(showMenuConfig);
            });
        } else {
            showMenuConfig.data = assign({}, data, {
                target: event.target
            });
            showMenu(showMenuConfig);
        }
    }

    elemRef = (c) => {
        this.elem = c;
    }

    render() {
        const { renderTag, attributes, children } = this.props;
        const newAttrs = assign({}, attributes, {
            className: cx(cssClasses.menuWrapper, attributes.className),
            onContextMenu: this.handleContextMenu,
            onTouchStart: this.handleTouchstart,
            onTouchMove: this.handleTouchMove,
            onTouchCancel: this.handleTouchCancel,
            onTouchEnd: this.handleTouchEnd,
            ref: this.elemRef
        });

        return React.createElement(renderTag, newAttrs, children);
    }
}
