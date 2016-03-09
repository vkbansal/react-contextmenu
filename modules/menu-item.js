"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _monitor = require("./monitor");

var _monitor2 = _interopRequireDefault(_monitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;


var MenuItem = _react2.default.createClass({
    displayName: "MenuItem",
    propTypes: {
        onClick: PropTypes.func.isRequired,
        data: PropTypes.object,
        disabled: PropTypes.bool,
        preventClose: PropTypes.bool
    },
    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false,
            data: {}
        };
    },
    handleClick: function handleClick(event) {
        var _props = this.props;
        var disabled = _props.disabled;
        var onClick = _props.onClick;
        var data = _props.data;
        var preventClose = _props.preventClose;


        event.preventDefault();

        if (disabled) return;

        (0, _objectAssign2.default)(data, _monitor2.default.getItem());

        if (typeof onClick === "function") {
            onClick(event, data);
        }

        if (preventClose) return;

        _monitor2.default.hideMenu();
    },
    render: function render() {
        var _props2 = this.props;
        var disabled = _props2.disabled;
        var children = _props2.children;


        var classes = (0, _classnames2.default)({
            "react-context-menu-link": true,
            disabled: disabled
        });

        return _react2.default.createElement(
            "div",
            { className: "react-context-menu-item" },
            _react2.default.createElement(
                "a",
                { href: "#", className: classes, onClick: this.handleClick },
                children
            )
        );
    }
});

exports.default = MenuItem;