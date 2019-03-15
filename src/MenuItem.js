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
        onMouseLeave: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        data: {},
        divider: false,
        attributes: {},
        preventClose: false,
        onClick() { return null; },
        children: null,
        selected: false,
        onMouseMove: () => null,
        onMouseLeave: () => null
    };

    handleClick = (event) => {
        if (event.button !== 0 && event.button !== 1) {
            event.preventDefault();
        }

        if (this.props.disabled || this.props.divider) return;

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
        const { disabled, divider, children, attributes, selected } = this.props;
        const menuItemClassNames = cx(cssClasses.menuItem, attributes.className, {
            [cx(cssClasses.menuItemDisabled, attributes.disabledClassName)]: disabled,
            [cx(cssClasses.menuItemDivider, attributes.dividerClassName)]: divider,
            [cx(cssClasses.menuItemSelected, attributes.selectedClassName)]: selected
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
            </div>
        );
    }
}
