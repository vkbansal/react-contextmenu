"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (Component) {
    var displayName = Component.displayName || Component.name || "Component";

    return _react2.default.createClass({
        displayName: "ContextMenuConnector(" + displayName + ")",
        getInitialState: function getInitialState() {
            return {
                item: _store2.default.getState().currentItem
            };
        },
        componentDidMount: function componentDidMount() {
            this.unsubscribe = _store2.default.subscribe(this.handleUpdate);
        },
        componentWillUnmount: function componentWillUnmount() {
            this.unsubscribe();
        },
        handleUpdate: function handleUpdate() {
            this.setState(this.getInitialState());
        },
        render: function render() {
            return _react2.default.createElement(Component, _extends({}, this.props, { item: this.state.item }));
        }
    });
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _store = require("./redux/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }