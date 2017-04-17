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
        onClick: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        data: {},
        divider: false,
        attributes: {},
        preventClose: false,
        onClick() { return null; },
        children: null
    };

    handleClick = (event) => {
        event.preventDefault();

        if (this.props.disabled) return;

        callIfExists(
            this.props.onClick,
            event,
            assign({}, this.props.data, store.data),
            store.target
        );

        if (this.props.preventClose) return;

        hideMenu();
    }

    render() {
        const { disabled, divider, children, attributes } = this.props;
        const menuItemClassNames = cx(cssClasses.menuItem, attributes && attributes.className, {
            [cssClasses.menuItemDisabled]: disabled,
            [cssClasses.menuItemDivider]: divider
        });

        return (
            <div
                {...attributes} className={menuItemClassNames}
                role='menuitem' tabIndex='-1' aria-disabled={disabled ? 'true' : 'false'}
                aria-orientation={divider ? 'horizontal' : 'undefined'}
                onTouchEnd={this.handleClick} onClick={this.handleClick}>
                {divider ? null : children}
            </div>
        );
    }
}
