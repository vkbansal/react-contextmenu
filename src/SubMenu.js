import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import listener from './globalEventListener';

import AbstractMenu from './AbstractMenu';
import { cssClasses, hasOwnProp } from './helpers';

export default class SubMenu extends AbstractMenu {
    static propTypes = {
        children: PropTypes.node.isRequired,
        title: PropTypes.node.isRequired,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        hoverDelay: PropTypes.number,
        rtl: PropTypes.bool,
        selected: PropTypes.bool,
        onMouseMove: PropTypes.func,
        onMouseOut: PropTypes.func,
        forceOpen: PropTypes.bool,
        forceClose: PropTypes.func,
        parentKeyNavigationHandler: PropTypes.func
    };

    static defaultProps = {
        disabled: false,
        hoverDelay: 500,
        className: '',
        rtl: false,
        selected: false,
        onMouseMove: () => null,
        onMouseOut: () => null,
        forceOpen: false,
        forceClose: () => null,
        parentKeyNavigationHandler: () => null
    };

    constructor(props) {
        super(props);

        this.state = Object.assign({}, this.state, {
            visible: false
        });
    }

    componentDidMount() {
      this.listenId = listener.register(() => {}, this.hideMenu);
    }

    getSubMenuType() { // eslint-disable-line class-methods-use-this
        return SubMenu;
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.isVisibilityChange = (this.state.visible !== nextState.visible ||
                                  this.props.forceOpen !== nextProps.forceOpen) &&
                                  !(this.state.visible && nextProps.forceOpen) &&
                                  !(this.props.forceOpen && nextState.visible);
        return true;
    }

    componentDidUpdate() {
        if (!this.isVisibilityChange) return;
        if (this.props.forceOpen || this.state.visible) {
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

                this.registerHandlers();
                this.setState({ selectedItem: null });
            });
        } else {
            const cleanup = () => {
                this.subMenu.removeEventListener('transitionend', cleanup);
                this.subMenu.style.removeProperty('bottom');
                this.subMenu.style.removeProperty('right');
                this.subMenu.style.top = 0;
                this.subMenu.style.left = '100%';
                this.unregisterHandlers();
            };
            this.subMenu.addEventListener('transitionend', cleanup);
            this.subMenu.classList.remove(cssClasses.menuVisible);
        }
    }

    componentWillUnmount() {
        if (this.listenId) {
            listener.unregister(this.listenId);
        }

        if (this.opentimer) clearTimeout(this.opentimer);

        if (this.closetimer) clearTimeout(this.closetimer);

        this.unregisterHandlers();
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

    hideMenu = () => {
        if (this.props.forceOpen) {
            this.props.forceClose();
        }
        this.setState({ visible: false, selectedItem: null });
    }

    handleClick = (e) => {
        e.preventDefault();
    }

    handleMouseEnter = () => {
        if (this.closetimer) clearTimeout(this.closetimer);

        if (this.props.disabled || this.state.visible) return;

        this.opentimer = setTimeout(() => this.setState({
            visible: true,
            selectedItem: null
        }), this.props.hoverDelay);
    }

    handleMouseLeave = () => {
        if (this.opentimer) clearTimeout(this.opentimer);

        if (!this.state.visible) return;

        this.closetimer = setTimeout(() => this.setState({
            visible: false,
            selectedItem: null
        }), this.props.hoverDelay);
    }

    menuRef = (c) => {
        this.menu = c;
    }

    subMenuRef = (c) => {
        this.subMenu = c;
    }

    registerHandlers = () => {
        document.removeEventListener('keydown', this.props.parentKeyNavigationHandler);
        document.addEventListener('keydown', this.handleKeyNavigation);
    }

    unregisterHandlers = () => {
        document.removeEventListener('keydown', this.handleKeyNavigation);
        document.addEventListener('keydown', this.props.parentKeyNavigationHandler);
    }

    render() {
        const { children, disabled, title, selected } = this.props;
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
                [cssClasses.menuItemActive]: visible,
                [cssClasses.menuItemSelected]: selected
            }),
            onMouseMove: this.props.onMouseMove,
            onMouseOut: this.props.onMouseOut,
            onClick: this.handleClick
        };
        const subMenuProps = {
            ref: this.subMenuRef,
            style: {
                position: 'absolute',
                transition: 'opacity 1ms', // trigger transitionend event
                top: 0,
                left: '100%'
            },
            className: cx(cssClasses.menu, this.props.className)
        };

        return (
            <nav {...menuProps} role='menuitem' tabIndex='-1' aria-haspopup='true'>
                <div {...menuItemProps}>
                    {title}
                </div>
                <nav {...subMenuProps} role='menu' tabIndex='-1'>
                    {this.renderChildren(children)}
                </nav>
            </nav>
        );
    }
}
