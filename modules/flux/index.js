"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _flummox = require("flummox");

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

var Flux = (function (_Flummox) {
    _inherits(Flux, _Flummox);

    function Flux() {
        _classCallCheck(this, Flux);

        _get(Object.getPrototypeOf(Flux.prototype), "constructor", this).call(this);

        this.createActions("menu", _actions2["default"]);
        this.createStore("menu", _store2["default"], this);
    }

    return Flux;
})(_flummox.Flummox);

exports["default"] = new Flux();
module.exports = exports["default"];