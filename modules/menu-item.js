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
        data: PropTypes.object,
        disabled: PropTypes.bool,
        divider: PropTypes.bool,
        selected: PropTypes.bool,
        onClick: PropTypes.func,
        onSelect: PropTypes.func
    },
    contextTypes: {
        store: PropTypes.object.isRequired
    },
    defaultProps: {
        disabled: false,
        selected: false,
        data: {}
    },
    handleClick: function handleClick(event) {
        var _props = this.props;
        var disabled = _props.disabled;
        var onSelect = _props.onSelect;
        var onClick = _props.onClick;
        var data = _props.data;


        if (disabled) return event.preventDefault();

        (0, _objectAssign2.default)(data, _monitor2.default.getItem());

        if (typeof onSelect === "function") {
            event.preventDefault();
            onSelect(data);
            return this.hideMenu();
        }

        if (typeof onClick === "function") {
            onClick(event, data);
        }

        this.hideMenu();
    },
    hideMenu: function hideMenu() {
        this.context.store.dispatch({
            type: "SET_PARAMS",
            data: {
                isVisible: false,
                currentItem: {}
            }
        });
    },
    render: function render() {
        var _props2 = this.props;
        var divider = _props2.divider;
        var disabled = _props2.disabled;
        var selected = _props2.selected;
        var children = _props2.children;


        if (divider) {
            return _react2.default.createElement("li", { className: "divider" });
        }

        var classes = (0, _classnames2.default)({ disabled: disabled, active: selected });

        return _react2.default.createElement(
            "li",
            { className: classes },
            _react2.default.createElement(
                "a",
                { href: "#", onMouseDown: this.handleClick },
                children
            )
        );
    }
});

exports.default = MenuItem;