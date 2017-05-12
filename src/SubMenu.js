import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { cssClasses, hasOwnProp, callIfExists, getChildrenCount } from './helpers';

export default class SubMenu extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        title: PropTypes.node.isRequired,
        handleLock: PropTypes.func.isRequired,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        active: PropTypes.bool,
        hoverDelay: PropTypes.number,
        rtl: PropTypes.bool
    };

    static defaultProps = {
        active: false,
        handleLock: () => null,
        disabled: false,
        hoverDelay: 500,
        className: '',
        rtl: false
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            selected: -1
        };

        this.childrenCount = getChildrenCount(this.props.children);
        this.handlersRegistered = false;
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.childrenCount = getChildrenCount(nextProps.children);

        if (!nextState.visible) {
            this.setState({
                selected: -1
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.visible !== nextState.visible
            || this.state.selected !== nextState.selected
            || this.props.active !== nextProps.active;
    }


    componentDidUpdate() {
        if (this.props.active) {
            this.registerHandlers();
        } else {
            this.unregisterHandlers();
        }

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

        this.unregisterHandlers();
    }

    registerHandlers = () => { // eslint-disable-line react/sort-comp
        if (this.handlersRegistered) return;
        console.log('reg');
        document.addEventListener('keyup', this.handleKeyUp);
        this.handlersRegistered = true;
    }

    unregisterHandlers = () => {
        if (!this.handlersRegistered) return;
        console.log('unreg');
        document.removeEventListener('keyup', this.handleKeyUp);
        this.handlersRegistered = false;
    }

    handleLock = lock => this.lock = lock;

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

    handleClick = (e) => {
        e.preventDefault();
    }

    handleMouseEnter = () => {
        if (this.closetimer) clearTimeout(this.closetimer);

        if (this.props.disabled || this.state.visible) return;

        this.opentimer = setTimeout(() => this.setState({ visible: true }), this.props.hoverDelay);
    }

    handleMouseLeave = () => {
        if (this.opentimer) clearTimeout(this.opentimer);

        if (!this.state.visible) return;

        this.closetimer = setTimeout(() => this.setState({ visible: false }), this.props.hoverDelay);
    }

    handleKeyUp = (e) => {
        switch (e.keyCode) {
            case 37: // left
                if (this.state.visible && !this.lock) {
                    this.setState({ visible: false, selected: -1 });
                    callIfExists(this.props.handleLock, false);
                }
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
            case 39: // right
                if (!this.state.visible && !this.lock) {
                    callIfExists(this.props.handleLock, true);
                    this.setState({ visible: true });
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
            case 27: // escape
                this.setState({ visible: false, selected: -1 });
                callIfExists(this.props.handleLock, false);
                break;
            default:
                console.log(e.keyCode);
        }
    }

    menuRef = (c) => {
        this.menu = c;
    }

    subMenuRef = (c) => {
        this.subMenu = c;
    }

    render() {
        const { children, disabled, title, active } = this.props;
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
                [cssClasses.menuItemActive]: active || visible
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
        let dividerCount = 0;

        return (
            <nav {...menuProps} role='menuitem' tabIndex='-1' aria-haspopup='true'>
                <div {...menuItemProps}>
                    {title}
                </div>
                <nav {...subMenuProps} role='menu' tabIndex='-1'>
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
            </nav>
        );
    }
}
