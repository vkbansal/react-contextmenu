"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var MenuContainer = _react2["default"].createClass({
    displayName: "MenuContainer",
    getInitialState: function getInitialState() {
        return {
            position: "fixed",
            left: 0,
            right: 0
        };
    },
    componentDidMount: function componentDidMount() {
        this.localNode = _react2["default"].findDOMNode(this.refs.menu);
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this._unbindHandlers();
        if (nextProps.isVisible) {
            this.setState(this.getMenuPosition(nextProps.x, nextProps.y));
        }
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
        return this.props.isVisible !== nextProps.visible;
    },
    componentDidUpdate: function componentDidUpdate() {
        if (this.props.isVisible) {
            this._bindHandlers();
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        this._unbindHandlers();
        delete this.localNode;
    },
    getMenuPosition: function getMenuPosition(x, y) {
        var menu = _react2["default"].findDOMNode(this.refs.menu);
        var scrollX = document.documentElement.scrollTop;
        var scrollY = document.documentElement.scrollLeft;
        var screen = window.screen;
        var AvailWidth = screen.AvailWidth;
        var AvailHeight = screen.AvailHeight;
        var offsetWidth = menu.offsetWidth;
        var offsetHeight = menu.offsetHeight;
        var menuStyles = {};

        menuStyles.top = y + scrollY;

        if (y + offsetHeight > AvailHeight) {
            menuStyles.top -= offsetHeight;
        }

        menuStyles.left = x + scrollX;

        if (x + offsetWidth > AvailWidth) {
            menuStyles.left -= offsetWidth;
        }

        return menuStyles;
    },
    _outsideClickHandler: function _outsideClickHandler(event) {
        var _props = this.props;
        var isVisible = _props.isVisible;
        var identifier = _props.identifier;

        if (isVisible === identifier) {
            var localNode = this.localNode,
                source = event.target,
                found = false;

            while (source.parentNode) {
                found = source === localNode;

                if (found) {
                    return;
                }

                source = source.parentNode;
            }

            this._hideMenu();
        }
    },
    _hideMenu: function _hideMenu() {
        this.props.flux.getActions("menu").setParams({
            isVisible: false,
            currentItem: {}
        });
    },
    _bindHandlers: function _bindHandlers() {
        var fn = this._outsideClickHandler,
            fn2 = this._hideMenu;
        document.addEventListener("mousedown", fn);
        document.addEventListener("touchstart", fn);
        window.addEventListener("resize", fn2);
        document.addEventListener("scroll", fn2);
    },
    _unbindHandlers: function _unbindHandlers() {
        var fn = this._outsideClickHandler,
            fn2 = this._hideMenu;
        document.removeEventListener("mousedown", fn);
        document.removeEventListener("touchstart", fn);
        window.addEventListener("resize", fn2);
        document.addEventListener("scroll", fn2);
    },
    render: function render() {
        var _props2 = this.props;
        var currentItem = _props2.currentItem;
        var isVisible = _props2.isVisible;
        var identifier = _props2.identifier;

        var classes = (0, _classnames2["default"])({
            "context-menu": true,
            "open": isVisible === identifier
        });

        return _react2["default"].createElement(
            "div",
            { className: classes, style: this.state },
            _react2["default"].createElement(
                "ul",
                { ref: "menu", className: "dropdown-menu" },
                this.props.children
            )
        );
    }
});

exports["default"] = MenuContainer;
module.exports = exports["default"];