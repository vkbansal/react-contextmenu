import { store } from './helpers';

export enum MenuActions {
    SHOW = 'REACT_CONTEXTMENU_SHOW',
    HIDE = 'REACT_CONTEXTMENU_HIDE'
}

declare global {
    interface Window {
        CustomEvent: {
            new<T>(typeArg: string, eventInitDict?: CustomEventInit<T>): CustomEvent
        };
    }
}

export function dispatchGlobalEvent<T extends Record<string, any>>(eventName: string, opts: T, target: Window | Element = window) {
  // Compatibale with IE
  // @see http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
    let event: CustomEvent<T>;

    if (typeof window.CustomEvent === 'function') {
        event = new window.CustomEvent(eventName, { detail: { ...opts,  type: eventName } });
    } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, false, true, { ...opts,  type: eventName });
    }

    if (target) {
        target.dispatchEvent(event);
        Object.getOwnPropertyNames(opts).map((key) => {
            store[key] = opts[key];
        })
    }
}

export function showMenu(opts = {}, target?: Window | Element) {
    dispatchGlobalEvent(MenuActions.SHOW, opts, target);
}

export function hideMenu(opts = {}, target?: Window | Element) {
    dispatchGlobalEvent(MenuActions.HIDE, opts, target);
}
