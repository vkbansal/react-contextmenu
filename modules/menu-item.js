"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _lodashMerge = require("lodash.merge");

var _lodashMerge2 = _interopRequireDefault(_lodashMerge);

var PropTypes = _react2["default"].PropTypes;

var MenuItem = _react2["default"].createClass({
    displayName: "MenuItem",
    propTypes: {
        disabled: PropTypes.bool,
        selected: PropTypes.bool,
        divider: PropTypes.bool,
        data: PropTypes.object,
        onSelect: PropTypes.func,
        onClick: PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
        return {
            disabled: false,
            selected: false,
            data: null
        };
    },
    handleClick: function handleClick(event) {
        var _props = this.props;
        var disabled = _props.disabled;
        var onSelect = _props.onSelect;
        var onClick = _props.onClick;
        var currentItem = _props.currentItem;
        var data = _props.data;

        if (disabled) {
            event.preventDefault();
            return;
        }

        if (typeof onSelect === "function") {
            event.preventDefault();
            onSelect((0, _lodashMerge2["default"])(currentItem, data));
            this.props.hideMenu();
            return;
        }

        if (typeof onClick === "function") {
            onClick(event, (0, _lodashMerge2["default"])(currentItem, data));
        }

        this.props.hideMenu();
    },
    render: function render() {
        var _props2 = this.props;
        var divider = _props2.divider;
        var disabled = _props2.disabled;
        var selected = _props2.selected;
        var children = _props2.children;

        if (divider) {
            return _react2["default"].createElement("li", { className: "divider" });
        }

        var classes = (0, _classnames2["default"])({ disabled: disabled, active: selected });

        return _react2["default"].createElement(
            "li",
            { className: classes },
            _react2["default"].createElement(
                "a",
                { href: "#", onMouseDown: this.handleClick },
                children
            )
        );
    }
});

exports["default"] = MenuItem;
module.exports = exports["default"];