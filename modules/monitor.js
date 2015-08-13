"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _flux = require("./flux");

var _flux2 = _interopRequireDefault(_flux);

var _flux$getStore = _flux2["default"].getStore("menu");

var state = _flux$getStore.state;
exports["default"] = {
    getItem: function getItem() {
        return state.currentItem;
    },
    getPosition: function getPosition() {
        var x = state.x;
        var y = state.y;

        return { x: x, y: y };
    }
};
module.exports = exports["default"];