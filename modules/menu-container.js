"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _desc, _value, _class, _class2, _temp;

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _autobindDecorator = require("autobind-decorator");

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {
        enumerable: !!descriptor.enumerable,
        configurable: !!descriptor.configurable
    };

    if ('value' in descriptor || 'initializer' in descriptor) {
        desc.writable = true;
        desc.initializer = descriptor.initializer;
        desc.value = descriptor.value;
    } else {
        desc.get = descriptor.get;
        desc.set = descriptor.set;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var MenuContainer = (_class = (_temp = _class2 = (function (_Component) {
    _inherits(MenuContainer, _Component);

    function MenuContainer(props) {
        _classCallCheck(this, MenuContainer);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuContainer).call(this, props));

        _this.state = {
            position: "fixed",
            left: 0,
            right: 0
        };
        return _this;
    }

    _createClass(MenuContainer, [{
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
        value: function getMenuPosition(x, y) {
            var menu = (0, _reactDom.findDOMNode)(this.refs.menu);
            var scrollX = document.documentElement.scrollTop;
            var scrollY = document.documentElement.scrollLeft;
            var _window = window;
            var screen = _window.screen;
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
        value: function _hideMenu() {
            this.props.flux.getActions("menu").setParams({
                isVisible: false,
                currentItem: {}
            });
        }
    }, {
        key: "_bindHandlers",
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

            var classes = (0, _classnames2.default)({
                "context-menu": true,
                "open": isVisible === identifier
            });

            return _react2.default.createElement(
                "div",
                { className: classes, style: this.state },
                _react2.default.createElement(
                    "ul",
                    { ref: "menu", className: "dropdown-menu" },
                    this.props.children
                )
            );
        }
    }]);

    return MenuContainer;
})(_react.Component), _class2.displayName = "MenuContainer", _temp), (_applyDecoratedDescriptor(_class.prototype, "getMenuPosition", [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, "getMenuPosition"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_outsideClickHandler", [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, "_outsideClickHandler"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_hideMenu", [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, "_hideMenu"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_bindHandlers", [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, "_bindHandlers"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_unbindHandlers", [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, "_unbindHandlers"), _class.prototype)), _class);
exports.default = MenuContainer;