var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { Component } from 'react';

import ContextMenuTrigger from './ContextMenuTrigger';
import listener from './globalEventListener';

// collect ContextMenuTrigger's expected props to NOT pass them on as part of the context
var ignoredTriggerProps = [].concat(_toConsumableArray(Object.keys(ContextMenuTrigger.propTypes)), ['children']);

// expect the id of the menu to be responsible for as outer parameter
export default function (menuId) {
    // expect menu component to connect as inner parameter
    // <Child/> is presumably a wrapper of <ContextMenu/>
    return function (Child) {
        // return wrapper for <Child/> that forwards the ContextMenuTrigger's additional props
        return function (_Component) {
            _inherits(ConnectMenu, _Component);

            function ConnectMenu(props) {
                _classCallCheck(this, ConnectMenu);

                var _this = _possibleConstructorReturn(this, (ConnectMenu.__proto__ || Object.getPrototypeOf(ConnectMenu)).call(this, props));

                _this.handleShow = function (e) {
                    if (e.detail.id !== menuId) return;

                    // the onShow event's detail.data object holds all ContextMenuTrigger props
                    var data = e.detail.data;

                    var filteredData = {};

                    for (var key in data) {
                        // exclude props the ContextMenuTrigger is expecting itself
                        if (!ignoredTriggerProps.includes(key)) {
                            filteredData[key] = data[key];
                        }
                    }
                    _this.setState({ trigger: filteredData });
                };

                _this.handleHide = function () {
                    _this.setState({ trigger: null });
                };

                _this.state = { trigger: null };
                return _this;
            }

            _createClass(ConnectMenu, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.listenId = listener.register(this.handleShow, this.handleHide);
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    if (this.listenId) {
                        listener.unregister(this.listenId);
                    }
                }
            }, {
                key: 'render',
                value: function render() {
                    return React.createElement(Child, _extends({}, this.props, { id: menuId, trigger: this.state.trigger }));
                }
            }]);

            return ConnectMenu;
        }(Component);
    };
}