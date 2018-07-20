var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import assign from 'object-assign';

import listener from './globalEventListener';
import AbstractMenu from './AbstractMenu';
import SubMenu from './SubMenu';
import { hideMenu } from './actions';
import { cssClasses, callIfExists, store } from './helpers';

var ContextMenu = function (_AbstractMenu) {
    _inherits(ContextMenu, _AbstractMenu);

    function ContextMenu(props) {
        _classCallCheck(this, ContextMenu);

        var _this = _possibleConstructorReturn(this, (ContextMenu.__proto__ || Object.getPrototypeOf(ContextMenu)).call(this, props));

        _this.registerHandlers = function () {
            document.addEventListener('mousedown', _this.handleOutsideClick);
            document.addEventListener('touchstart', _this.handleOutsideClick);
            document.addEventListener('scroll', _this.handleHide);
            document.addEventListener('contextmenu', _this.handleHide);
            document.addEventListener('keydown', _this.handleKeyNavigation);
            window.addEventListener('resize', _this.handleHide);
        };

        _this.unregisterHandlers = function () {
            document.removeEventListener('mousedown', _this.handleOutsideClick);
            document.removeEventListener('touchstart', _this.handleOutsideClick);
            document.removeEventListener('scroll', _this.handleHide);
            document.removeEventListener('contextmenu', _this.handleHide);
            document.removeEventListener('keydown', _this.handleKeyNavigation);
            window.removeEventListener('resize', _this.handleHide);
        };

        _this.handleShow = function (e) {
            if (e.detail.id !== _this.props.id || _this.state.isVisible) return;

            var _e$detail$position = e.detail.position,
                x = _e$detail$position.x,
                y = _e$detail$position.y;


            _this.setState({ isVisible: true, x: x, y: y });
            _this.registerHandlers();
            callIfExists(_this.props.onShow, e);
        };

        _this.handleHide = function (e) {
            if (_this.state.isVisible && (!e.detail || !e.detail.id || e.detail.id === _this.props.id)) {
                _this.unregisterHandlers();
                _this.setState({ isVisible: false, selectedItem: null, forceSubMenuOpen: false });
                callIfExists(_this.props.onHide, e);
            }
        };

        _this.handleOutsideClick = function (e) {
            if (!_this.menu.contains(e.target)) hideMenu();
        };

        _this.handleMouseLeave = function (event) {
            event.preventDefault();

            callIfExists(_this.props.onMouseLeave, event, assign({}, _this.props.data, store.data), store.target);

            if (_this.props.hideOnLeave) hideMenu();
        };

        _this.handleContextMenu = function (e) {
            if (process.env.NODE_ENV === 'production') {
                e.preventDefault();
            }
            _this.handleHide(e);
        };

        _this.hideMenu = function (e) {
            if (e.keyCode === 27 || e.keyCode === 13) {
                // ECS or enter
                hideMenu();
            }
        };

        _this.getMenuPosition = function () {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var menuStyles = {
                top: y,
                left: x
            };

            if (!_this.menu) return menuStyles;

            var _window = window,
                innerWidth = _window.innerWidth,
                innerHeight = _window.innerHeight;

            var rect = _this.menu.getBoundingClientRect();

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

        _this.menuRef = function (c) {
            _this.menu = c;
        };

        _this.state = assign({}, _this.state, {
            x: 0,
            y: 0,
            isVisible: false
        });
        return _this;
    }

    _createClass(ContextMenu, [{
        key: 'getSubMenuType',
        value: function getSubMenuType() {
            // eslint-disable-line class-methods-use-this
            return SubMenu;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.listenId = listener.register(this.handleShow, this.handleHide);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _this2 = this;

            if (this.state.isVisible) {
                var wrapper = window.requestAnimationFrame || setTimeout;

                wrapper(function () {
                    var _state = _this2.state,
                        x = _state.x,
                        y = _state.y;

                    var _getMenuPosition = _this2.getMenuPosition(x, y),
                        top = _getMenuPosition.top,
                        left = _getMenuPosition.left;

                    wrapper(function () {
                        if (!_this2.menu) return;
                        _this2.menu.style.top = top + 'px';
                        _this2.menu.style.left = left + 'px';
                        _this2.menu.style.opacity = 1;
                        _this2.menu.style.pointerEvents = 'auto';
                    });
                });
            } else {
                if (!this.menu) return;
                this.menu.style.opacity = 0;
                this.menu.style.pointerEvents = 'none';
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.listenId) {
                listener.unregister(this.listenId);
            }

            this.unregisterHandlers();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                className = _props.className,
                style = _props.style;
            var isVisible = this.state.isVisible;

            var inlineStyle = assign({}, style, { position: 'fixed', opacity: 0, pointerEvents: 'none' });
            var menuClassnames = cx(cssClasses.menu, className, _defineProperty({}, cssClasses.menuVisible, isVisible));

            return React.createElement(
                'nav',
                {
                    role: 'menu', tabIndex: '-1', ref: this.menuRef, style: inlineStyle, className: menuClassnames,
                    onContextMenu: this.handleContextMenu, onMouseLeave: this.handleMouseLeave },
                this.renderChildren(children)
            );
        }
    }]);

    return ContextMenu;
}(AbstractMenu);

ContextMenu.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    data: PropTypes.object,
    className: PropTypes.string,
    hideOnLeave: PropTypes.bool,
    onHide: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onShow: PropTypes.func,
    style: PropTypes.object
};
ContextMenu.defaultProps = {
    className: '',
    data: {},
    hideOnLeave: false,
    onHide: function onHide() {
        return null;
    },
    onMouseLeave: function onMouseLeave() {
        return null;
    },
    onShow: function onShow() {
        return null;
    },

    style: {}
};
export default ContextMenu;