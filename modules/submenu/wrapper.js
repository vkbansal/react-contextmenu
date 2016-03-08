"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubMenuWrapper = _react2.default.createClass({
    displayName: "SubMenuWrapper",
    getInitialState: function getInitialState() {
        return {
            position: {
                top: true,
                right: true
            }
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var _this = this;

        if (nextProps.visible) {
            var wrapper = window.requestAnimationFrame || setTimeout;

            wrapper(function () {
                _this.setState(_this.getMenuPosition());
                _this.forceUpdate();
            });
        } else {
            this.setState(this.getInitialState());
        }
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
        return this.props.visible !== nextProps.visible;
    },
    getMenuPosition: function getMenuPosition() {
        var _window = window;
        var innerWidth = _window.innerWidth;
        var innerHeight = _window.innerHeight;
        var rect = this.menu.getBoundingClientRect();
        var position = {};

        if (rect.bottom > innerHeight) {
            position.bottom = true;
        } else {
            position.top = true;
        }

        if (rect.right > innerWidth) {
            position.left = true;
        } else {
            position.right = true;
        }

        return { position: position };
    },
    getPositionStyles: function getPositionStyles() {
        var style = {};
        var position = this.state.position;


        if (position.top) style.top = 0;
        if (position.bottom) style.bottom = 0;
        if (position.right) style.left = "100%";
        if (position.left) style.right = "100%";

        return style;
    },
    render: function render() {
        var _this2 = this;

        var _props = this.props;
        var children = _props.children;
        var visible = _props.visible;


        var style = _extends({
            display: visible ? "block" : "none",
            position: "absolute"
        }, this.getPositionStyles());

        return _react2.default.createElement(
            "nav",
            { ref: function ref(c) {
                    return _this2.menu = c;
                }, style: style, className: "react-context-menu" },
            children
        );
    }
});

exports.default = SubMenuWrapper;