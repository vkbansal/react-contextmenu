'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require('./actions');

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GlobalEventListener = function GlobalEventListener() {
    var _this = this;

    _classCallCheck(this, GlobalEventListener);

    this.handleShowEvent = function (event) {
        for (var id in _this.callbacks) {
            if ((0, _helpers.hasOwnProp)(_this.callbacks, id)) _this.callbacks[id].show(event);
        }
    };

    this.handleHideEvent = function (event) {
        for (var id in _this.callbacks) {
            if ((0, _helpers.hasOwnProp)(_this.callbacks, id)) _this.callbacks[id].hide(event);
        }
    };

    this.register = function (showCallback, hideCallback) {
        var id = (0, _helpers.uniqueId)();

        _this.callbacks[id] = {
            show: showCallback,
            hide: hideCallback
        };

        return id;
    };

    this.unregister = function (id) {
        if (id && _this.callbacks[id]) {
            delete _this.callbacks[id];
        }
    };

    this.callbacks = {};

    if (_helpers.canUseDOM) {
        window.addEventListener(_actions.MENU_SHOW, this.handleShowEvent);
        window.addEventListener(_actions.MENU_HIDE, this.handleHideEvent);
    }
};

exports.default = new GlobalEventListener();