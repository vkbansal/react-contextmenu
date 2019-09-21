'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _actions = require('./actions');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = function (_Component) {
    _inherits(MenuItem, _Component);

    function MenuItem() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, MenuItem);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
            if (event.button !== 0 && event.button !== 1) {
                event.preventDefault();
            }

            if (_this.props.disabled || _this.props.divider) return;

            (0, _helpers.callIfExists)(_this.props.onClick, event, (0, _objectAssign2.default)({}, _this.props.data, _helpers.store.data), _helpers.store.target);

            if (_this.props.preventClose) return;

            (0, _actions.hideMenu)();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MenuItem, [{
        key: 'render',
        value: function render() {
            var _cx,
                _this2 = this;

            var _props = this.props,
                attributes = _props.attributes,
                children = _props.children,
                className = _props.className,
                disabled = _props.disabled,
                divider = _props.divider,
                selected = _props.selected;


            var menuItemClassNames = (0, _classnames2.default)(className, _helpers.cssClasses.menuItem, attributes.className, (_cx = {}, _defineProperty(_cx, (0, _classnames2.default)(_helpers.cssClasses.menuItemDisabled, attributes.disabledClassName), disabled), _defineProperty(_cx, (0, _classnames2.default)(_helpers.cssClasses.menuItemDivider, attributes.dividerClassName), divider), _defineProperty(_cx, (0, _classnames2.default)(_helpers.cssClasses.menuItemSelected, attributes.selectedClassName), selected), _cx));

            return _react2.default.createElement(
                'div',
                _extends({}, attributes, { className: menuItemClassNames,
                    role: 'menuitem', tabIndex: '-1', 'aria-disabled': disabled ? 'true' : 'false',
                    'aria-orientation': divider ? 'horizontal' : null,
                    ref: function ref(_ref2) {
                        _this2.ref = _ref2;
                    },
                    onMouseMove: this.props.onMouseMove, onMouseLeave: this.props.onMouseLeave,
                    onTouchEnd: this.handleClick, onClick: this.handleClick }),
                divider ? null : children
            );
        }
    }]);

    return MenuItem;
}(_react.Component);

MenuItem.propTypes = {
    attributes: _propTypes2.default.object,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    data: _propTypes2.default.object,
    disabled: _propTypes2.default.bool,
    divider: _propTypes2.default.bool,
    onClick: _propTypes2.default.func,
    onMouseLeave: _propTypes2.default.func,
    onMouseMove: _propTypes2.default.func,
    preventClose: _propTypes2.default.bool,
    selected: _propTypes2.default.bool
};
MenuItem.defaultProps = {
    attributes: {},
    children: null,
    className: '',
    data: {},
    disabled: false,
    divider: false,
    onClick: function onClick() {
        return null;
    },

    onMouseMove: function onMouseMove() {
        return null;
    },
    onMouseLeave: function onMouseLeave() {
        return null;
    },
    preventClose: false,
    selected: false
};
exports.default = MenuItem;