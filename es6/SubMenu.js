var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import assign from 'object-assign';

import AbstractMenu from './AbstractMenu';
import { callIfExists, cssClasses, hasOwnProp, store } from './helpers';
import listener from './globalEventListener';

var SubMenu = function (_AbstractMenu) {
    _inherits(SubMenu, _AbstractMenu);

    function SubMenu(props) {
        _classCallCheck(this, SubMenu);

        var _this = _possibleConstructorReturn(this, (SubMenu.__proto__ || Object.getPrototypeOf(SubMenu)).call(this, props));

        _this.getMenuPosition = function () {
            var _window = window,
                innerWidth = _window.innerWidth,
                innerHeight = _window.innerHeight;

            var rect = _this.subMenu.getBoundingClientRect();
            var position = {};

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
        };

        _this.getRTLMenuPosition = function () {
            var _window2 = window,
                innerHeight = _window2.innerHeight;

            var rect = _this.subMenu.getBoundingClientRect();
            var position = {};

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
        };

        _this.hideMenu = function (e) {
            // avoid closing submenus of a different menu tree
            if (e.detail && e.detail.id && _this.menu && e.detail.id !== _this.menu.id) {
                return;
            }

            if (_this.props.forceOpen) {
                _this.props.forceClose();
            }
            _this.setState({ visible: false, selectedItem: null });
            _this.unregisterHandlers();
        };

        _this.handleClick = function (event) {
            event.preventDefault();

            if (_this.props.disabled) return;

            callIfExists(_this.props.onClick, event, assign({}, _this.props.data, store.data), store.target);
        };

        _this.handleMouseEnter = function () {
            if (_this.closetimer) clearTimeout(_this.closetimer);

            if (_this.props.disabled || _this.state.visible) return;

            _this.opentimer = setTimeout(function () {
                return _this.setState({
                    visible: true,
                    selectedItem: null
                });
            }, _this.props.hoverDelay);
        };

        _this.handleMouseLeave = function () {
            if (_this.opentimer) clearTimeout(_this.opentimer);

            if (!_this.state.visible) return;

            _this.closetimer = setTimeout(function () {
                return _this.setState({
                    visible: false,
                    selectedItem: null
                });
            }, _this.props.hoverDelay);
        };

        _this.menuRef = function (c) {
            _this.menu = c;
        };

        _this.subMenuRef = function (c) {
            _this.subMenu = c;
        };

        _this.registerHandlers = function () {
            document.removeEventListener('keydown', _this.props.parentKeyNavigationHandler);
            document.addEventListener('keydown', _this.handleKeyNavigation);
        };

        _this.unregisterHandlers = function (dismounting) {
            document.removeEventListener('keydown', _this.handleKeyNavigation);
            if (!dismounting) {
                document.addEventListener('keydown', _this.props.parentKeyNavigationHandler);
            }
        };

        _this.state = assign({}, _this.state, {
            visible: false
        });
        return _this;
    }

    _createClass(SubMenu, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.listenId = listener.register(function () {}, this.hideMenu);
        }
    }, {
        key: 'getSubMenuType',
        value: function getSubMenuType() {
            // eslint-disable-line class-methods-use-this
            return SubMenu;
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            this.isVisibilityChange = (this.state.visible !== nextState.visible || this.props.forceOpen !== nextProps.forceOpen) && !(this.state.visible && nextProps.forceOpen) && !(this.props.forceOpen && nextState.visible);
            return true;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            if (!this.isVisibilityChange) return;
            if (this.props.forceOpen || this.state.visible) {
                var wrapper = window.requestAnimationFrame || setTimeout;
                wrapper(function () {
                    var styles = _this2.props.rtl ? _this2.getRTLMenuPosition() : _this2.getMenuPosition();

                    _this2.subMenu.style.removeProperty('top');
                    _this2.subMenu.style.removeProperty('bottom');
                    _this2.subMenu.style.removeProperty('left');
                    _this2.subMenu.style.removeProperty('right');

                    if (hasOwnProp(styles, 'top')) _this2.subMenu.style.top = styles.top;
                    if (hasOwnProp(styles, 'left')) _this2.subMenu.style.left = styles.left;
                    if (hasOwnProp(styles, 'bottom')) _this2.subMenu.style.bottom = styles.bottom;
                    if (hasOwnProp(styles, 'right')) _this2.subMenu.style.right = styles.right;
                    _this2.subMenu.classList.add(cssClasses.menuVisible);

                    _this2.registerHandlers();
                    _this2.setState({ selectedItem: null });
                });
            } else {
                var cleanup = function cleanup() {
                    _this2.subMenu.removeEventListener('transitionend', cleanup);
                    _this2.subMenu.style.removeProperty('bottom');
                    _this2.subMenu.style.removeProperty('right');
                    _this2.subMenu.style.top = 0;
                    _this2.subMenu.style.left = '100%';
                    _this2.unregisterHandlers();
                };
                this.subMenu.addEventListener('transitionend', cleanup);
                this.subMenu.classList.remove(cssClasses.menuVisible);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.listenId) {
                listener.unregister(this.listenId);
            }

            if (this.opentimer) clearTimeout(this.opentimer);

            if (this.closetimer) clearTimeout(this.closetimer);

            this.unregisterHandlers(true);
        }
    }, {
        key: 'render',
        value: function render() {
            var _cx;

            var _props = this.props,
                children = _props.children,
                attributes = _props.attributes,
                disabled = _props.disabled,
                title = _props.title,
                selected = _props.selected;
            var visible = this.state.visible;

            var menuProps = {
                ref: this.menuRef,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave,
                className: cx(cssClasses.menuItem, cssClasses.subMenu, attributes.listClassName),
                style: {
                    position: 'relative'
                }
            };
            var menuItemProps = {
                className: cx(cssClasses.menuItem, attributes.className, (_cx = {}, _defineProperty(_cx, cx(cssClasses.menuItemDisabled, attributes.disabledClassName), disabled), _defineProperty(_cx, cx(cssClasses.menuItemActive, attributes.visibleClassName), visible), _defineProperty(_cx, cx(cssClasses.menuItemSelected, attributes.selectedClassName), selected), _cx)),
                onMouseMove: this.props.onMouseMove,
                onMouseOut: this.props.onMouseOut,
                onClick: this.handleClick
            };
            var subMenuProps = {
                ref: this.subMenuRef,
                style: {
                    position: 'absolute',
                    transition: 'opacity 1ms', // trigger transitionend event
                    top: 0,
                    left: '100%'
                },
                className: cx(cssClasses.menu, this.props.className)
            };

            return React.createElement(
                'nav',
                _extends({}, menuProps, { role: 'menuitem', tabIndex: '-1', 'aria-haspopup': 'true' }),
                React.createElement(
                    'div',
                    _extends({}, attributes, menuItemProps),
                    title
                ),
                React.createElement(
                    'nav',
                    _extends({}, subMenuProps, { role: 'menu', tabIndex: '-1' }),
                    this.renderChildren(children)
                )
            );
        }
    }]);

    return SubMenu;
}(AbstractMenu);

SubMenu.propTypes = {
    children: PropTypes.node.isRequired,
    attributes: PropTypes.object,
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
SubMenu.defaultProps = {
    disabled: false,
    hoverDelay: 500,
    attributes: {},
    className: '',
    rtl: false,
    selected: false,
    onMouseMove: function onMouseMove() {
        return null;
    },
    onMouseOut: function onMouseOut() {
        return null;
    },
    forceOpen: false,
    forceClose: function forceClose() {
        return null;
    },
    parentKeyNavigationHandler: function parentKeyNavigationHandler() {
        return null;
    }
};
export default SubMenu;