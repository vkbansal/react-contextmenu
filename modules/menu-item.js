"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _objectAssign = require("object-assign");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _flux = require("./flux");

var _flux2 = _interopRequireDefault(_flux);

var _monitor = require("./monitor");

var _monitor2 = _interopRequireDefault(_monitor);

var MenuItem = (function (_Component) {
    _inherits(MenuItem, _Component);

    function MenuItem() {
        _classCallCheck(this, MenuItem);

        _get(Object.getPrototypeOf(MenuItem.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(MenuItem, [{
        key: "handleClick",
        value: function handleClick(event) {
            var _props = this.props;
            var disabled = _props.disabled;
            var onSelect = _props.onSelect;
            var onClick = _props.onClick;
            var data = _props.data;

            if (disabled) {
                event.preventDefault();
                return;
            }

            (0, _objectAssign2["default"])(data, _monitor2["default"].getItem());

            if (typeof onSelect === "function") {
                event.preventDefault();
                onSelect(data);
                this.hideMenu();
                return;
            }

            if (typeof onClick === "function") {
                onClick(event, data);
            }

            this.hideMenu();
        }
    }, {
        key: "hideMenu",
        value: function hideMenu() {
            _flux2["default"].getActions("menu").setParams({
                isVisible: false,
                currentItem: {}
            });
        }
    }, {
        key: "render",
        value: function render() {
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
                    { href: "#", onMouseDown: this.handleClick.bind(this) },
                    children
                )
            );
        }
    }], [{
        key: "displayName",
        value: "MenuItem",
        enumerable: true
    }, {
        key: "propTypes",
        value: {
            data: _react.PropTypes.object,
            disabled: _react.PropTypes.bool,
            divider: _react.PropTypes.bool,
            onClick: _react.PropTypes.func,
            onSelect: _react.PropTypes.func,
            selected: _react.PropTypes.bool
        },
        enumerable: true
    }, {
        key: "defaultProps",
        value: {
            disabled: false,
            selected: false,
            data: {}
        },
        enumerable: true
    }]);

    return MenuItem;
})(_react.Component);

exports["default"] = MenuItem;
module.exports = exports["default"];