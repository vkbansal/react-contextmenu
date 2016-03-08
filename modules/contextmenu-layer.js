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
            handleContextClick: function handleContextClick(event) {
                var currentItem = typeof configure === "function" ? configure(this.props) : {};

                (0, _invariant2.default)((0, _lodash2.default)(currentItem), "Expected configure to return an object. See %s", displayName);

                event.preventDefault();

                _store2.default.dispatch({
                    type: "SET_PARAMS",
                    data: {
                        x: event.clientX,
                        y: event.clientY,
                        currentItem: currentItem,
                        isVisible: typeof identifier === "function" ? identifier(this.props) : identifier
                    }
                });
            },
            render: function render() {
                return _react2.default.createElement(
                    "div",
                    { className: "react-context-menu-wrapper",
                        onContextMenu: this.handleContextClick },
                    _react2.default.createElement(Component, this.props)
                );
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

var Component = _react2.default.Component;