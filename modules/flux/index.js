"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _flummox = require("flummox");

var _actions = require("./actions");

var _actions2 = _interopRequireDefault(_actions);

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Flux = (function (_Flummox) {
    _inherits(Flux, _Flummox);

    function Flux() {
        _classCallCheck(this, Flux);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Flux).call(this));

        _this.createActions("menu", _actions2.default);
        _this.createStore("menu", _store2.default, _this);
        return _this;
    }

    return Flux;
})(_flummox.Flummox);

exports.default = new Flux();