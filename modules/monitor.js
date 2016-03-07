"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _store = require("./redux/store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getItem: function getItem() {
        return _store2.default.getState().currentItem;
    },
    getPosition: function getPosition() {
        var _store$getState = _store2.default.getState();

        var x = _store$getState.x;
        var y = _store$getState.y;


        return { x: x, y: y };
    },
    hideMenu: function hideMenu() {
        _store2.default.dispatch({
            type: "SET_PARAMS",
            data: {
                isVisible: false,
                currentItem: {}
            }
        });
    }
};