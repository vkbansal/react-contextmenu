"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = (_temp = _class = function (_Component) {
    _inherits(MenuItem, _Component);

    function MenuItem() {
        _classCallCheck(this, MenuItem);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(MenuItem).apply(this, arguments));
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

            (0, _objectAssign2.default)(data, _monitor2.default.getItem());

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
            _flux2.default.getActions("menu").setParams({
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
                return _react2.default.createElement("li", { className: "divider" });
            }

            var classes = (0, _classnames2.default)({ disabled: disabled, active: selected });

            return _react2.default.createElement(
                "li",
                { className: classes },
                _react2.default.createElement(
                    "a",
                    { href: "#", onMouseDown: this.handleClick.bind(this) },
                    children
                )
            );
        }
    }]);

    return MenuItem;
}(_react.Component), _class.displayName = "MenuItem", _class.propTypes = {
    data: _react.PropTypes.object,
    disabled: _react.PropTypes.bool,
    divider: _react.PropTypes.bool,
    onClick: _react.PropTypes.func,
    onSelect: _react.PropTypes.func,
    selected: _react.PropTypes.bool
}, _class.defaultProps = {
    disabled: false,
    selected: false,
    data: {}
}, _temp);
exports.default = MenuItem;