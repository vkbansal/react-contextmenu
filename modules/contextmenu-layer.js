"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (identifier, configure) {
    return function (Component) {
        var _desc, _value, _class, _class2, _temp;

        var displayName = Component.displayName || Component.name || "Component";

        (0, _invariant2.default)(identifier && (typeof identifier === "string" || (typeof identifier === "undefined" ? "undefined" : _typeof(identifier)) === "symbol" || typeof identifier === "function"), "Expected identifier to be string, symbol or function. See %s", displayName);

        (0, _invariant2.default)(typeof configure === "function", "Expected configure to be a function. See %s", displayName);

        return _class = (_temp = _class2 = function (_Component) {
            _inherits(_class2, _Component);

            function _class2() {
                _classCallCheck(this, _class2);

                return _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).apply(this, arguments));
            }

            _createClass(_class2, [{
                key: "componentDidMount",
                value: function componentDidMount() {
                    document.addEventListener("contextmenu", this.handleContextClick);
                }
            }, {
                key: "componentWillUnmount",
                value: function componentWillUnmount() {
                    document.removeEventListener("contextmenu", this.handleContextClick);
                }
            }, {
                key: "handleContextClick",
                value: function handleContextClick(event) {
                    var target = event.target;
                    var domNode = (0, _reactDom.findDOMNode)(this);
                    if (target == domNode || domNode.contains(target)) {
                        var currentItem = configure(this.props);

                        (0, _invariant2.default)((0, _lodash2.default)(currentItem), "Expected configure to return an object. See %s", displayName);

                        event.preventDefault();
                        var actions = _flux2.default.getActions("menu");
                        actions.setParams({
                            x: event.clientX,
                            y: event.clientY,
                            currentItem: currentItem,
                            isVisible: typeof identifier === "function" ? identifier(this.props) : identifier
                        });
                    }
                }
            }, {
                key: "render",
                value: function render() {
                    return _react2.default.createElement(Component, _extends({}, this.props, { identifier: identifier }));
                }
            }]);

            return _class2;
        }(Component), _class2.displayName = displayName + "ContextMenuLayer", _temp), (_applyDecoratedDescriptor(_class.prototype, "handleContextClick", [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, "handleContextClick"), _class.prototype)), _class;
    };
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _lodash = require("lodash.isobject");

var _lodash2 = _interopRequireDefault(_lodash);

var _autobindDecorator = require("autobind-decorator");

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _flux = require("./flux");

var _flux2 = _interopRequireDefault(_flux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
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