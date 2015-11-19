"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === "function") { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _autobindDecorator = require("autobind-decorator");

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var MenuContainer = (function (_Component) {
    _inherits(MenuContainer, _Component);

    _createClass(MenuContainer, null, [{
        key: "displayName",
        value: "MenuContainer",
        enumerable: true
    }]);

    function MenuContainer(props) {
        _classCallCheck(this, MenuContainer);

        _get(Object.getPrototypeOf(MenuContainer.prototype), "constructor", this).call(this, props);

        this.state = {
            position: "fixed",
            left: 0,
            right: 0
        };
    }

    _createDecoratedClass(MenuContainer, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.localNode = (0, _reactDom.findDOMNode)(this.refs.menu);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this._unbindHandlers();
            if (nextProps.isVisible) {
                this.setState(this.getMenuPosition(nextProps.x, nextProps.y));
            }
        }
    }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps) {
            return this.props.isVisible !== nextProps.visible;
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            if (this.props.isVisible) {
                this._bindHandlers();
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this._unbindHandlers();
            delete this.localNode;
        }
    }, {
        key: "getMenuPosition",
        decorators: [_autobindDecorator2["default"]],
        value: function getMenuPosition(x, y) {
            var menu = (0, _reactDom.findDOMNode)(this.refs.menu);
            var scrollX = document.documentElement.scrollTop;
            var scrollY = document.documentElement.scrollLeft;
            var screen = window.screen;
            var AvailWidth = screen.AvailWidth;
            var AvailHeight = screen.AvailHeight;
            var offsetWidth = menu.offsetWidth;
            var offsetHeight = menu.offsetHeight;
            var menuStyles = {};

            menuStyles.top = y + scrollY;

            if (y + offsetHeight > AvailHeight) {
                menuStyles.top -= offsetHeight;
            }

            menuStyles.left = x + scrollX;

            if (x + offsetWidth > AvailWidth) {
                menuStyles.left -= offsetWidth;
            }

            return menuStyles;
        }
    }, {
        key: "_outsideClickHandler",
        decorators: [_autobindDecorator2["default"]],
        value: function _outsideClickHandler(event) {
            var _props = this.props;
            var isVisible = _props.isVisible;
            var identifier = _props.identifier;

            if (isVisible === identifier) {
                var localNode = this.localNode,
                    source = event.target,
                    found = false;

                while (source.parentNode) {
                    found = source === localNode;

                    if (found) {
                        return;
                    }

                    source = source.parentNode;
                }

                this._hideMenu();
            }
        }
    }, {
        key: "_hideMenu",
        decorators: [_autobindDecorator2["default"]],
        value: function _hideMenu() {
            this.props.flux.getActions("menu").setParams({
                isVisible: false,
                currentItem: {}
            });
        }
    }, {
        key: "_bindHandlers",
        decorators: [_autobindDecorator2["default"]],
        value: function _bindHandlers() {
            var fn = this._outsideClickHandler,
                fn2 = this._hideMenu;
            document.addEventListener("mousedown", fn);
            document.addEventListener("touchstart", fn);
            window.addEventListener("resize", fn2);
            document.addEventListener("scroll", fn2);
        }
    }, {
        key: "_unbindHandlers",
        decorators: [_autobindDecorator2["default"]],
        value: function _unbindHandlers() {
            var fn = this._outsideClickHandler,
                fn2 = this._hideMenu;
            document.removeEventListener("mousedown", fn);
            document.removeEventListener("touchstart", fn);
            window.removeEventListener("resize", fn2);
            document.removeEventListener("scroll", fn2);
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props;
            var currentItem = _props2.currentItem;
            var isVisible = _props2.isVisible;
            var identifier = _props2.identifier;

            var classes = (0, _classnames2["default"])({
                "context-menu": true,
                "open": isVisible === identifier
            });

            return _react2["default"].createElement(
                "div",
                { className: classes, style: this.state },
                _react2["default"].createElement(
                    "ul",
                    { ref: "menu", className: "dropdown-menu" },
                    this.props.children
                )
            );
        }
    }]);

    return MenuContainer;
})(_react.Component);

exports["default"] = MenuContainer;
module.exports = exports["default"];