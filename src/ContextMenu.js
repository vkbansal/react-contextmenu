import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import assign from 'object-assign';

import listener from './globalEventListener';
import { hideMenu } from './actions';
import { cssClasses, callIfExists, store, getChildrenCount } from './helpers';

export default class ContextMenu extends Component {
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

        this.state = {
            x: 0,
            y: 0,
            visible: false,
            selected: -1
        };

        this.childrenCount = getChildrenCount(this.props.children);
    }

    componentDidMount() {
        this.listenId = listener.register(this.handleShow, this.handleHide);
    }

    componentWillReceiveProps(nextProps) {
        this.childrenCount = getChildrenCount(nextProps.children);
    }

    componentDidUpdate() {
        if (this.state.visible) {
            const wrapper = window.requestAnimationFrame || setTimeout;

            wrapper(() => {
                const { x, y } = this.state;

                const { top, left } = this.getMenuPosition(x, y);

                wrapper(() => {
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

    registerHandlers = () => { // eslint-disable-line react/sort-comp
        document.addEventListener('mousedown', this.handleOutsideClick);
        document.addEventListener('ontouchstart', this.handleOutsideClick);
        document.addEventListener('scroll', this.handleHide);
        document.addEventListener('contextmenu', this.handleHide);
        document.addEventListener('keyup', this.handleEscape);
        window.addEventListener('resize', this.handleHide);
    }

    unregisterHandlers = () => {
        document.removeEventListener('mousedown', this.handleOutsideClick);
        document.removeEventListener('ontouchstart', this.handleOutsideClick);
        document.removeEventListener('scroll', this.handleHide);
        document.removeEventListener('contextmenu', this.handleHide);
        document.removeEventListener('keyup', this.handleEscape);
        window.removeEventListener('resize', this.handleHide);
    }

    handleShow = (e) => {
        if (e.detail.id !== this.props.id || this.state.visible) return;

        const { x, y } = e.detail.position;

        this.setState({ visible: true, x, y, selected: -1 });
        this.registerHandlers();
        callIfExists(this.props.onShow, e);
    }

    handleHide = (e) => {
        if (this.state.visible && (!e.detail || !e.detail.id || e.detail.id === this.props.id)) {
            this.unregisterHandlers();
            this.setState({ visible: false, selected: -1 });
            callIfExists(this.props.onHide, e);
        }
    }

    handleEscape = (e) => {
        switch (e.keyCode) {
            case 27: // escape
                hideMenu();
                break;
            case 38: // up
                if (this.state.visible && !this.lock) {
                    this.setState(state => ({
                        selected: typeof state.selected !== 'number'
                                    ? this.childrenCount - 1
                                    : state.selected <= 0
                                        ? this.childrenCount - 1
                                        : state.selected - 1
                    }));
                }
                break;
            case 40: // down
                if (this.state.visible && !this.lock) {
                    this.setState(state => ({
                        selected: typeof state.selected !== 'number'
                                    ? 0
                                    : state.selected >= this.childrenCount - 1
                                        ? 0
                                        : state.selected + 1
                    }));
                }
                break;
            default:
                console.log(e.keyCode);
        }
    }

    handleLock = lock => this.lock = lock;

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
    }

    menuRef = (c) => {
        this.menu = c;
    }

    render() {
        const { children, className } = this.props;
        const { visible } = this.state;
        const style = { position: 'fixed', opacity: 0, pointerEvents: 'none' };
        const menuClassnames = cx(cssClasses.menu, className, {
            [cssClasses.menuVisible]: visible
        });
        let dividerCount = 0;

        return (
            <nav
                role='menu' tabIndex='-1' ref={this.menuRef} style={style} className={menuClassnames}
                onContextMenu={this.handleHide} onMouseLeave={this.handleMouseLeave}>
                {React.Children.map(
                    children,
                    (ChildNode, index) => {
                        if (ChildNode.props.divider) dividerCount++;

                        return React.cloneElement(
                            ChildNode,
                            {
                                active: !ChildNode.props.divider && index === this.state.selected + dividerCount,
                                handleLock: this.handleLock
                            }
                        );
                    }
                )}
            </nav>
        );
    }
}
