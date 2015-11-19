"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === "function") { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _lodashIsobject = require("lodash.isobject");

var _lodashIsobject2 = _interopRequireDefault(_lodashIsobject);

var _autobindDecorator = require("autobind-decorator");

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _flux = require("./flux");

var _flux2 = _interopRequireDefault(_flux);

exports["default"] = function (identifier, configure) {
    return function (Component) {
        var displayName = Component.displayName || Component.name || "Component";

        (0, _invariant2["default"])(identifier && (typeof identifier === "string" || typeof identifier === "symbol" || typeof identifier === "function"), "Expected identifier to be string, symbol or function. See %s", displayName);

        (0, _invariant2["default"])(typeof configure === "function", "Expected configure to be a function. See %s", displayName);

        return (function (_Component) {
            _inherits(_class, _Component);

            function _class() {
                _classCallCheck(this, _class);

                _get(Object.getPrototypeOf(_class.prototype), "constructor", this).apply(this, arguments);
            }

            _createDecoratedClass(_class, [{
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
                decorators: [_autobindDecorator2["default"]],
                value: function handleContextClick(event) {
                    var target = event.target;
                    var domNode = (0, _reactDom.findDOMNode)(this);
                    if (target == domNode || domNode.contains(target)) {
                        var currentItem = configure(this.props);

                        (0, _invariant2["default"])((0, _lodashIsobject2["default"])(currentItem), "Expected configure to return an object. See %s", displayName);

                        event.preventDefault();
                        var actions = _flux2["default"].getActions("menu");
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
                    return _react2["default"].createElement(Component, _extends({}, this.props, { identifier: identifier }));
                }
            }], [{
                key: "displayName",
                value: displayName + "ContextMenuLayer",
                enumerable: true
            }]);

            return _class;
        })(Component);
    };
};

module.exports = exports["default"];