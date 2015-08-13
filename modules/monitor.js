"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _flux = require("./flux");

var _flux2 = _interopRequireDefault(_flux);

exports["default"] = {
    getItem: function getItem() {
        return _flux2["default"].getStore("menu").state.currentItem;
    },
    getPosition: function getPosition() {
        var _flux$getStore$state = _flux2["default"].getStore("menu").state;

        var x = _flux$getStore$state.x;
        var y = _flux$getStore$state.y;

        return { x: x, y: y };
    }
};
module.exports = exports["default"];