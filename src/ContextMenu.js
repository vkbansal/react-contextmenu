import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import assign from 'object-assign';

import listener from './globalEventListener';
import { hideMenu } from './actions';
import { cssClasses, callIfExists, store } from './helpers';

export default class ContextMenu extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        className: PropTypes.string,
        hideOnLeave: PropTypes.bool,
        onHide: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onShow: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            y: 0,
            isVisible: false
        };
    }

    componentDidMount() {
        this.listenId = listener.register(this.handleShow, this.handleHide);
    }

    componentDidUpdate() {
        if (this.state.isVisible) {
            window.requestAnimationFrame(() => {
                const { x, y } = this.state;

                const { top, left } = this.getMenuPosition(x, y);

                window.requestAnimationFrame(() => {
                    this.menu.style.top = `${top}px`;
                    this.menu.style.left = `${left}px`;
                    this.menu.style.opacity = 1;
                    this.menu.style.pointerEvents = 'auto';
                });
            });
        } else {
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
        document.addEventListener('keyup', this.handleEscape);
        window.addEventListener('resize', this.handleHide);
    };

    unregisterHandlers = () => {
        document.removeEventListener('mousedown', this.handleOutsideClick);
        document.removeEventListener('ontouchstart', this.handleOutsideClick);
        document.removeEventListener('scroll', this.handleHide);
        document.removeEventListener('contextmenu', this.handleHide);
        document.removeEventListener('keyup', this.handleEscape);
        window.removeEventListener('resize', this.handleHide);
    };

    handleShow = e => {
        if (e.detail.id !== this.props.id || this.state.isVisible) return;

        const { x, y } = e.detail.position;

        this.setState({ isVisible: true, x, y });
        this.registerHandlers();
        callIfExists(this.props.onShow, e);
    };

    handleHide = e => {
        if (this.state.isVisible) {
            this.unregisterHandlers();
            this.setState({ isVisible: false });
            callIfExists(this.props.onHide, e);
        }
    };

    handleEscape = e => {
        if (e.keyCode === 27) {
            hideMenu();
        }
    };

    handleOutsideClick = e => {
        if (!this.menu.contains(e.target)) hideMenu();
    };

    handleMouseLeave = event => {
        event.preventDefault();

        callIfExists(this.props.onMouseLeave, event, assign({}, this.props.data, store.data), store.target);

        if (this.props.hideOnLeave) hideMenu();
    };

    getMenuPosition = (x = 0, y = 0) => {
        const { innerWidth, innerHeight } = window;
        const rect = this.menu.getBoundingClientRect();
        const menuStyles = {
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

        return menuStyles;
    };

    menuRef = c => {
        this.menu = c;
    };

    render() {
        const { children, className } = this.props;
        const { isVisible } = this.state;
        const style = { position: 'fixed', opacity: 0, pointerEvents: 'none' };
        const menuClassnames = cx(cssClasses.menu, className, {
            [cssClasses.menuVisible]: isVisible
        });

        return (
            <nav
                ref={this.menuRef}
                style={style}
                className={menuClassnames}
                onContextMenu={this.handleHide}
                onMouseLeave={this.handleMouseLeave}>
                {children}
            </nav>
        );
    }
}
