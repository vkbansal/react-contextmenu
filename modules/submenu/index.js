"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _wrapper = require("./wrapper");

var _wrapper2 = _interopRequireDefault(_wrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var menuStyles = {
    position: "relative",
    zIndex: "auto"
};

var SubMenu = _react2.default.createClass({
    displayName: "SubMenu",
    propTypes: {
        title: _react2.default.PropTypes.string.isRequired,
        disabled: _react2.default.PropTypes.bool,
        hoverDelay: _react2.default.PropTypes.number
    },
    getDefaultProps: function getDefaultProps() {
        return {
            hoverDelay: 500
        };
    },
    getInitialState: function getInitialState() {
        return {
            visible: false
        };
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return this.state.isVisible !== nextState.visible;
    },
    handleClick: function handleClick(e) {
        e.preventDefault();
    },
    handleMouseEnter: function handleMouseEnter() {
        var _this = this;

        if (this.closetimer) clearTimeout(this.closetimer);

        if (this.props.disabled || this.state.visible) return;

        this.opentimer = setTimeout(function () {
            return _this.setState({ visible: true });
        }, this.props.hoverDelay);
    },
    handleMouseLeave: function handleMouseLeave() {
        var _this2 = this;

        if (this.opentimer) clearTimeout(this.opentimer);

        if (!this.state.visible) return;

        this.closetimer = setTimeout(function () {
            return _this2.setState({ visible: false });
        }, this.props.hoverDelay);
    },
    componentWillUnmount: function componentWillUnmount() {
        if (this.opentimer) clearTimeout(this.opentimer);

        if (this.closetimer) clearTimeout(this.closetimer);
    },
    render: function render() {
        var _this3 = this;

        var _props = this.props;
        var disabled = _props.disabled;
        var children = _props.children;
        var title = _props.title;
        var visible = this.state.visible;


        var classes = (0, _classnames2.default)({
            "react-context-menu-link": true,
            disabled: disabled,
            active: visible
        }),
            menuClasses = "react-context-menu-item submenu";

        return _react2.default.createElement(
            "div",
            { ref: function ref(c) {
                    return _this3.item = c;
                }, className: menuClasses, style: menuStyles,
                onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
            _react2.default.createElement(
                "a",
                { href: "#", className: classes, onClick: this.handleClick },
                title
            ),
            _react2.default.createElement(
                _wrapper2.default,
                { visible: visible },
                children
            )
        );
    }
});

exports.default = SubMenu;