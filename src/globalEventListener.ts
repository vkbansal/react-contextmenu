import { MENU_SHOW, MENU_HIDE } from './actions';
import { uniqueId, hasOwnProp, canUseDOM } from './helpers';

export interface EventCallbackObject {
    show: (e: Event) => void;
    hide: (e: Event) => void
}

class GlobalEventListener {
    private callbacks: Record<string, EventCallbackObject> = {};

    constructor() {
        if (canUseDOM) {
            window.addEventListener(MENU_SHOW, this.handleShowEvent);
            window.addEventListener(MENU_HIDE, this.handleHideEvent);
        }
    }

    handleShowEvent = (event: Event) => {
        for (const id in this.callbacks) {
            if (hasOwnProp(this.callbacks, id)) this.callbacks[id].show(event);
        }
    }

    handleHideEvent = (event: Event) => {
        for (const id in this.callbacks) {
            if (hasOwnProp(this.callbacks, id)) this.callbacks[id].hide(event);
        }
    }

    register = (showCallback: (e: Event) => void, hideCallback: (e: Event) => void): string => {
        const id = uniqueId();

        this.callbacks[id] = {
            show: showCallback,
            hide: hideCallback
        };

        return id;
    }

    unregister = (id?: string) => {
        if (id && this.callbacks[id]) {
            delete this.callbacks[id];
        }
    }
}

export default new GlobalEventListener();
