function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { MENU_SHOW, MENU_HIDE } from './actions';
import { uniqueId, hasOwnProp, canUseDOM } from './helpers';

var GlobalEventListener = function GlobalEventListener() {
    var _this = this;

    _classCallCheck(this, GlobalEventListener);

    this.handleShowEvent = function (event) {
        for (var id in _this.callbacks) {
            if (hasOwnProp(_this.callbacks, id)) _this.callbacks[id].show(event);
        }
    };

    this.handleHideEvent = function (event) {
        for (var id in _this.callbacks) {
            if (hasOwnProp(_this.callbacks, id)) _this.callbacks[id].hide(event);
        }
    };

    this.register = function (showCallback, hideCallback) {
        var id = uniqueId();

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

    if (canUseDOM) {
        window.addEventListener(MENU_SHOW, this.handleShowEvent);
        window.addEventListener(MENU_HIDE, this.handleHideEvent);
    }
};

export default new GlobalEventListener();