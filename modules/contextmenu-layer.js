"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (identifier, configure) {
    return function (Component) {
        var displayName = Component.displayName || Component.name || "Component";

        (0, _invariant2.default)(identifier && (typeof identifier === "string" || (typeof identifier === "undefined" ? "undefined" : _typeof(identifier)) === "symbol" || typeof identifier === "function"), "Expected identifier to be string, symbol or function. See %s", displayName);

        if (configure) {
            (0, _invariant2.default)(typeof configure === "function", "Expected configure to be a function. See %s", displayName);
        }

        return _react2.default.createClass({
            displayName: displayName + "ContextMenuLayer",
            mouseDown: false,
            getDefaultProps: function getDefaultProps() {
                return {
                    renderTag: "div",
                    attributes: {}
                };
            },
            handleMouseDown: function handleMouseDown(event) {
                var _this = this;

                if (this.props.holdToDisplay >= 0 && event.button === 0) {
                    event.persist();

                    this.mouseDown = true;
                    setTimeout(function () {
                        if (_this.mouseDown) {
                            _this.handleContextClick(event);
                        }
                    }, this.props.holdToDisplay);
                }
            },
            handleTouchstart: function handleTouchstart(event) {
                var _this2 = this;

                event.persist();

                this.mouseDown = true;
                setTimeout(function () {
                    if (_this2.mouseDown) {
                        _this2.handleContextClick(event);
                    }
                }, this.props.holdToDisplay);
            },
            handleTouchEnd: function handleTouchEnd(event) {
                event.preventDefault();
                this.mouseDown = false;
            },
            handleMouseUp: function handleMouseUp(event) {
                if (event.button === 0) {
                    this.mouseDown = false;
                }
            },
            handleContextClick: function handleContextClick(event) {
                var currentItem = typeof configure === "function" ? configure(this.props) : {};

                (0, _invariant2.default)((0, _lodash2.default)(currentItem), "Expected configure to return an object. See %s", displayName);

                event.preventDefault();

                var xPos = event.clientX || event.touches[0].pageX;
                var yPos = event.clientY || event.touches[0].pageY;

                _store2.default.dispatch({
                    type: "SET_PARAMS",
                    data: {
                        x: xPos,
                        y: yPos,
                        currentItem: currentItem,
                        isVisible: typeof identifier === "function" ? identifier(this.props) : identifier
                    }
                });
            },
            render: function render() {
                var _props = this.props;
                var _props$attributes = _props.attributes;
                var _props$attributes$cla = _props$attributes.className;
                var className = _props$attributes$cla === undefined ? "" : _props$attributes$cla;

                var attributes = _objectWithoutProperties(_props$attributes, ["className"]);

                var renderTag = _props.renderTag;

                var props = _objectWithoutProperties(_props, ["attributes", "renderTag"]);

                attributes.className = "react-context-menu-wrapper " + className;
                attributes.onContextMenu = this.handleContextClick;
                attributes.onMouseDown = this.handleMouseDown;
                attributes.onMouseUp = this.handleMouseUp;
                attributes.onTouchStart = this.handleTouchstart;
                attributes.onTouchEnd = this.handleTouchEnd;
                attributes.onMouseOut = this.handleMouseUp;

                return _react2.default.createElement(renderTag, attributes, _react2.default.createElement(Component, props));
            }
        });
    };
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _lodash = require("lodash.isobject");

var _lodash2 = _interopRequireDefault(_lodash);

var _store = require("./redux/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }