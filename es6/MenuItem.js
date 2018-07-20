var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import assign from 'object-assign';

import { hideMenu } from './actions';
import { callIfExists, cssClasses, store } from './helpers';

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
            event.preventDefault();

            if (_this.props.disabled || _this.props.divider) return;

            callIfExists(_this.props.onClick, event, assign({}, _this.props.data, store.data), store.target);

            if (_this.props.preventClose) return;

            hideMenu();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MenuItem, [{
        key: 'render',
        value: function render() {
            var _cx,
                _this2 = this;

            var _props = this.props,
                disabled = _props.disabled,
                divider = _props.divider,
                children = _props.children,
                attributes = _props.attributes,
                selected = _props.selected;

            var menuItemClassNames = cx(cssClasses.menuItem, attributes.className, (_cx = {}, _defineProperty(_cx, cx(cssClasses.menuItemDisabled, attributes.disabledClassName), disabled), _defineProperty(_cx, cx(cssClasses.menuItemDivider, attributes.dividerClassName), divider), _defineProperty(_cx, cx(cssClasses.menuItemSelected, attributes.selectedClassName), selected), _cx));

            return React.createElement(
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
}(Component);

MenuItem.propTypes = {
    children: PropTypes.node,
    attributes: PropTypes.object,
    data: PropTypes.object,
    disabled: PropTypes.bool,
    divider: PropTypes.bool,
    preventClose: PropTypes.bool,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func
};
MenuItem.defaultProps = {
    disabled: false,
    data: {},
    divider: false,
    attributes: {},
    preventClose: false,
    onClick: function onClick() {
        return null;
    },

    children: null,
    selected: false,
    onMouseMove: function onMouseMove() {
        return null;
    },
    onMouseLeave: function onMouseLeave() {
        return null;
    }
};
export default MenuItem;