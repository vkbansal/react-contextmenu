import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { cssClasses, hasOwnProp } from './helpers';

export default class SubMenu extends Component {
    static propTypes = {
        title: PropTypes.node.isRequired,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        hoverDelay: PropTypes.number,
        rtl: PropTypes.bool
    };

    static defaultProps = {
        disabled: false,
        hoverDelay: 500
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isVisible !== nextState.visible;
    }

    componentDidUpdate() {
        if (this.state.visible) {
            const wrapper = window.requestAnimationFrame || setTimeout;

            wrapper(() => {
                const styles = this.props.rtl
                                ? this.getRTLMenuPosition()
                                : this.getMenuPosition();

                this.subMenu.style.removeProperty('top');
                this.subMenu.style.removeProperty('bottom');
                this.subMenu.style.removeProperty('left');
                this.subMenu.style.removeProperty('right');

                if (hasOwnProp(styles, 'top')) this.subMenu.style.top = styles.top;
                if (hasOwnProp(styles, 'left')) this.subMenu.style.left = styles.left;
                if (hasOwnProp(styles, 'bottom')) this.subMenu.style.bottom = styles.bottom;
                if (hasOwnProp(styles, 'right')) this.subMenu.style.right = styles.right;
                this.subMenu.classList.add(cssClasses.menuVisible);
            });
        } else {
            this.subMenu.classList.remove(cssClasses.menuVisible);
            this.subMenu.style.removeProperty('bottom');
            this.subMenu.style.removeProperty('right');
            this.subMenu.style.top = 0;
            this.subMenu.style.left = '100%';
        }
    }

    componentWillUnmount() {
        if (this.opentimer) clearTimeout(this.opentimer);

        if (this.closetimer) clearTimeout(this.closetimer);
    }

    handleClick = (e) => {
        e.preventDefault();
    }

    handleMouseEnter = () => {
        if (this.closetimer) clearTimeout(this.closetimer);

        if (this.props.disabled || this.state.visible) return;

        this.opentimer = setTimeout(() => this.setState({visible: true}), this.props.hoverDelay);
    }

    handleMouseLeave = () => {
        if (this.opentimer) clearTimeout(this.opentimer);

        if (!this.state.visible) return;

        this.closetimer = setTimeout(() => this.setState({visible: false}), this.props.hoverDelay);
    }

    getMenuPosition = () => {
        const { innerWidth, innerHeight } = window;
        const rect = this.subMenu.getBoundingClientRect();
        const position = {};

        if (rect.bottom > innerHeight) {
            position.bottom = 0;
        } else {
            position.top = 0;
        }

        if (rect.right < innerWidth) {
            position.left = '100%';
        } else {
            position.right = '100%';
        }

        return position;
    }

    getRTLMenuPosition = () => {
        const { innerHeight } = window;
        const rect = this.subMenu.getBoundingClientRect();
        const position = {};

        if (rect.bottom > innerHeight) {
            position.bottom = 0;
        } else {
            position.top = 0;
        }

        if (rect.left < 0) {
            position.left = '100%';
        } else {
            position.right = '100%';
        }

        return position;
    }

    menuRef = (c) => {
        this.menu = c;
    }

    subMenuRef = (c) => {
        this.subMenu = c;
    }

    render() {
        const { children, disabled, title } = this.props;
        const { visible } = this.state;
        const menuProps = {
            ref: this.menuRef,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            className: cx(cssClasses.menuItem, cssClasses.subMenu),
            style: {
                position: 'relative'
            }
        };
        const menuItemProps = {
            className: cx(cssClasses.menuItem, {
                [cssClasses.menuItemDisabled]: disabled,
                [cssClasses.menuItemActive]: visible
            }),
            onClick: this.handleClick
        };
        const subMenuProps = {
            ref: this.subMenuRef,
            style: {
                position: 'absolute',
                top: 0,
                left: '100%'
            },
            className: cx(cssClasses.menu, this.props.className)
        };

        return (
            <nav {...menuProps}>
                <div {...menuItemProps}>
                    {title}
                </div>
                <nav {...subMenuProps}>
                    {children}
                </nav>
            </nav>
        );
    }
}
