import React, { PropTypes, Component} from 'react';
import cx from 'classnames';
import assign from 'object-assign';

import { hideMenu } from './actions';
import { callIfExists, cssClasses, store } from './helpers';

export default class MenuItem extends Component {
    static propTypes = {
        attributes: PropTypes.object,
        data: PropTypes.object,
        disabled: PropTypes.bool,
        preventClose: PropTypes.bool,
        onClick: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        data: {},
        attributes: {}
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
        const { disabled, children, attributes } = this.props;
        const menuItemClassNames = cx(cssClasses.menuItem, attributes && attributes.className);

        const linkClasses = cx(cssClasses.menuLink, {
            [cssClasses.menuLinkDisabled]: disabled
        });

        return (
            <div {...attributes} className={menuItemClassNames}>
                <a href='#' className={linkClasses} onClick={this.handleClick}>
                    {children}
                </a>
            </div>
        );
    }
}
