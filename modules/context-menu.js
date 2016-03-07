"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _store = require("./redux/store");

var _store2 = _interopRequireDefault(_store);

var _menuContainer = require("./menu-container");

var _menuContainer2 = _interopRequireDefault(_menuContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PropTypes = _react2.default.PropTypes;


var ContextMenu = _react2.default.createClass({
    displayName: "ContextMenu",
    propTypes: {
        identifier: PropTypes.string.isRequired
    },
    getInitialState: function getInitialState() {
        return _store2.default.getState();
    },
    componentDidMount: function componentDidMount() {
        this.unsubscribe = _store2.default.subscribe(this.handleUpdate);
    },
    componentWillUnmount: function componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    },
    handleUpdate: function handleUpdate() {
        this.setState(this.getInitialState());
    },
    render: function render() {
        return _react2.default.createElement(_menuContainer2.default, _extends({}, this.props, this.state));
    }
});

exports.default = ContextMenu;