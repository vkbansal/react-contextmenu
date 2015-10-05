"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _flux = require("./flux");

var _flux2 = _interopRequireDefault(_flux);

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _lodashIsobject = require("lodash.isobject");

var _lodashIsobject2 = _interopRequireDefault(_lodashIsobject);

exports["default"] = function (identifier, configure) {
    return function (Component) {
        var displayName = Component.displayName || Component.name || "Component";

        (0, _invariant2["default"])(identifier && (typeof identifier === "string" || typeof identifier === "symbol" || typeof identifier === "function"), "Expected identifier to be string, symbol or function. See %s", displayName);

        (0, _invariant2["default"])(typeof configure === "function", "Expected configure to be a function. See %s", displayName);

        return _react2["default"].createClass({
          displayName: displayName + "ContextMenuLayer",
          componentDidMount: function componentDidMount() {
              document.addEventListener("contextmenu", this.handleContextClick);
          },
          componentWillUnmount: function componentWillUnmount() {
              document.addEventListener("contextmenu", this.handleContextClick);
          },
          handleContextClick: function handleContextClick(event) {
              var target = event.target;
              var domNode = _react2["default"].findDOMNode(this);

              if(target == domNode || domNode.contains(target)) {
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

          },
          render: function render() {
              return _react2["default"].createElement(Component, _extends({}, this.props, { identifier: identifier }));
          }
      });
    };
};

module.exports = exports["default"];
