"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _flummoxComponent = require("flummox/component");

var _flummoxComponent2 = _interopRequireDefault(_flummoxComponent);

var _flux = require("./flux");

var _flux2 = _interopRequireDefault(_flux);

var _menuContainer = require("./menu-container");

var _menuContainer2 = _interopRequireDefault(_menuContainer);

var PropTypes = _react2["default"].PropTypes;

var ContextMenu = _react2["default"].createClass({
    displayName: "ContextMenu",
    propTypes: {
        identifier: PropTypes.string.isRequired
    },
    render: function render() {
        return _react2["default"].createElement(
            _flummoxComponent2["default"],
            { flux: _flux2["default"], connectToStores: ["menu"] },
            _react2["default"].createElement(_menuContainer2["default"], this.props)
        );
    }
});

exports["default"] = ContextMenu;
module.exports = exports["default"];