import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import assign from 'object-assign';

import { hideMenu } from './actions';
import { callIfExists, cssClasses, store } from './helpers';

export default class MenuItem extends Component {
    static propTypes = {
        children: PropTypes.node,
        attributes: PropTypes.object,
        data: PropTypes.object,
        disabled: PropTypes.bool,
        divider: PropTypes.bool,
        preventClose: PropTypes.bool,
        onClick: PropTypes.func,
        selected: PropTypes.bool,
        onMouseMove: PropTypes.func,
        onMouseLeave: PropTypes.func,
        isActive: PropTypes.bool,
        setActiveItem: PropTypes.func,
        index: PropTypes.number,
        trackSelection: PropTypes.bool
    };

    static defaultProps = {
        disabled: false,
        data: {},
        divider: false,
        attributes: {},
        preventClose: false,
        onClick() { return null; },
        children: null,
        isActive: false,
        selected: false,
        onMouseMove: () => null,
        onMouseLeave: () => null,
        setActiveItem: () => null,
        index: 0,
        trackSelection: false
    };

    setItem = () => {
        const { index, setActiveItem } = this.props;
        setActiveItem(index);
    }

    handleClick = (event) => {
        event.preventDefault();

        const { disabled, divider, onClick, data, preventClose, trackSelection } = this.props;

        if (disabled || divider) return;

        if (trackSelection) this.setItem();

        if (disabled || divider) return;

        callIfExists(
            onClick,
            event,
            assign({}, data, store.data),
            store.target
        );

        if (preventClose) return;

        hideMenu();
    }

    renderSelectedDot = () => {
        const trackedItemClass = cx(cssClasses.trackedItem);
        return (
            <span className={trackedItemClass} >&#8226;</span>
        );
    }

    render() {
        const { disabled, divider, children, attributes, selected, isActive } = this.props;

        const menuItemClassNames = cx(cssClasses.menuItem, attributes && attributes.className, {
            [cssClasses.menuItemDisabled]: disabled,
            [cssClasses.menuItemDivider]: divider,
            [cssClasses.menuItemSelected]: selected
        });

        return (
            <div
                {...attributes} className={menuItemClassNames}
                role='menuitem' tabIndex='-1' aria-disabled={disabled ? 'true' : 'false'}
                aria-orientation={divider ? 'horizontal' : null}
                ref={(ref) => { this.ref = ref; }}
                onMouseMove={this.props.onMouseMove} onMouseLeave={this.props.onMouseLeave}
                onTouchEnd={this.handleClick} onClick={this.handleClick}>
                {divider ? null : children}
                {isActive ? this.renderSelectedDot() : null}
            </div>
        );
    }
}
