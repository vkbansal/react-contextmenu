import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import assign from 'object-assign';

import listener from './globalEventListener';
import AbstractMenu from './AbstractMenu';
import SubMenu from './SubMenu';
import { hideMenu } from './actions';
import { cssClasses, callIfExists, store } from './helpers';

export default class ContextMenu extends AbstractMenu {
    static propTypes = {
        id: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        data: PropTypes.object,
        className: PropTypes.string,
        hideOnLeave: PropTypes.bool,
        onHide: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onShow: PropTypes.func
    };

    static defaultProps = {
        className: '',
        data: {},
        hideOnLeave: false,
        onHide() { return null; },
        onMouseLeave() { return null; },
        onShow() { return null; }
    };

    constructor(props) {
        super(props);

        this.state = assign({}, this.state, {
            x: 0,
            y: 0,
            isVisible: false,
        });
    }

    getSubMenuType() { // eslint-disable-line class-methods-use-this
        return SubMenu;
    }

    componentDidMount() {
        this.listenId = listener.register(this.handleShow, this.handleHide);
    }

    componentDidUpdate() {
        if (this.state.isVisible) {
            const wrapper = window.requestAnimationFrame || setTimeout;
            const { x, y } = this.state;

            if (this.props.direction === 'left') {
                wrapper(() => {
                const { top, left } = this.getMenuPosition(x, y);

                wrapper(() => {
                    if (!this.menu) return;
                    this.menu.style.top = `${top}px`;
                    this.menu.style.left = `${left}px`;
                    this.menu.style.opacity = 1;
                    this.menu.style.pointerEvents = 'auto';
                    });
                });
            } else if (this.props.direction === 'right') {
                wrapper(() => {
                const { top, right } = this.getMenuPosition(x, y);

                wrapper(() => {
                    if (!this.menu) return;
                    this.menu.style.top = `${top}px`;
                    this.menu.style.right = `${right}px`;
                    this.menu.style.opacity = 1;
                    this.menu.style.pointerEvents = 'auto';
                    });
                });
            }
        } else {
            if (!this.menu) return;
            this.menu.style.opacity = 0;
            this.menu.style.pointerEvents = 'none';
        }
    }

    componentWillUnmount() {
        if (this.listenId) {
            listener.unregister(this.listenId);
        }

        this.unregisterHandlers();
    }

    registerHandlers = () => {
        document.addEventListener('mousedown', this.handleOutsideClick);
        document.addEventListener('ontouchstart', this.handleOutsideClick);
        document.addEventListener('scroll', this.handleHide);
        document.addEventListener('contextmenu', this.handleHide);
        document.addEventListener('keydown', this.handleKeyNavigation);
        window.addEventListener('resize', this.handleHide);
    }

    unregisterHandlers = () => {
        document.removeEventListener('mousedown', this.handleOutsideClick);
        document.removeEventListener('ontouchstart', this.handleOutsideClick);
        document.removeEventListener('scroll', this.handleHide);
        document.removeEventListener('contextmenu', this.handleHide);
        document.removeEventListener('keydown', this.handleKeyNavigation);
        window.removeEventListener('resize', this.handleHide);
    }

    handleShow = (e) => {
        if (e.detail.id !== this.props.id || this.state.isVisible) return;

        const { x, y } = e.detail.position;

        this.setState({ isVisible: true, x, y });
        this.registerHandlers();
        callIfExists(this.props.onShow, e);
    }

    handleHide = (e) => {
        if (this.state.isVisible && (!e.detail || !e.detail.id || e.detail.id === this.props.id)) {
            this.unregisterHandlers();
            this.setState({ isVisible: false, selectedItem: null, forceSubMenuOpen: false });
            callIfExists(this.props.onHide, e);
        }
    }

    handleOutsideClick = (e) => {
        if (!this.menu.contains(e.target)) hideMenu();
    }

    handleMouseLeave = (event) => {
        event.preventDefault();

        callIfExists(
            this.props.onMouseLeave,
            event,
            assign({}, this.props.data, store.data),
            store.target
        );

        if (this.props.hideOnLeave) hideMenu();
    }

    handleContextMenu = (e) => {
        if (process.env.NODE_ENV === 'production') {
            e.preventDefault();
        }
        this.handleHide(e);
    }

    hideMenu = (e) => {
        if (e.keyCode === 27) { // enter
            hideMenu();
        }
    }

    getMenuPosition = (x = 0, y = 0) => {
        let menuStyles = {};

        if (!this.menu) return menuStyles;
        const { innerWidth, innerHeight } = window;
        const rect = this.menu.getBoundingClientRect();


        if (this.props.direction === 'left'){
            menuStyles = {
                top: y,
                left: x
            };

            if (y + rect.height > innerHeight) {
                menuStyles.top -= rect.height;
            }

            if (x + rect.width > innerWidth) {
                menuStyles.left -= rect.width;
            }

            if (menuStyles.top < 0) {
                menuStyles.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
            }

            if (menuStyles.left < 0) {
                menuStyles.left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
            }
        } else {
            menuStyles = {
                top: y,
                right: x
            };

            if (y + rect.height > innerHeight) {
                menuStyles.top -= rect.height;
            }

            if (x + rect.width > innerWidth) {
                menuStyles.right -= rect.width;
            }

            if (menuStyles.top < 0) {
                menuStyles.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
            }

            if (menuStyles.right < 0) {
                menuStyles.right = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
            }
        }
        console.log('menu styles', menuStyles);
        return menuStyles;
    }

    menuRef = (c) => {
        this.menu = c;
    }

    render() {
        const { children, className } = this.props;
        const { isVisible } = this.state;
        const style = { position: 'fixed', opacity: 0, pointerEvents: 'none' };
        const menuClassnames = cx(cssClasses.menu, className, {
            [cssClasses.menuVisible]: isVisible
        });
        console.log('state', this.state);
        console.log('props', this.props)
        return (
            <nav
                role='menu' tabIndex='-1' ref={this.menuRef} style={style} className={menuClassnames}
                onContextMenu={this.handleContextMenu} onMouseLeave={this.handleMouseLeave}>
                {this.renderChildren(children)}
            </nav>
        );
    }
}
