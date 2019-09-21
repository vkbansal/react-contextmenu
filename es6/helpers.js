export function callIfExists(func) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    return typeof func === 'function' && func.apply(undefined, args);
}

export function hasOwnProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function uniqueId() {
    return Math.random().toString(36).substring(7);
}

export var cssClasses = {
    menu: 'react-contextmenu',
    menuVisible: 'react-contextmenu--visible',
    menuWrapper: 'react-contextmenu-wrapper',
    menuItem: 'react-contextmenu-item',
    menuItemActive: 'react-contextmenu-item--active',
    menuItemDisabled: 'react-contextmenu-item--disabled',
    menuItemDivider: 'react-contextmenu-item--divider',
    menuItemSelected: 'react-contextmenu-item--selected',
    subMenu: 'react-contextmenu-submenu'
};

export var store = {};

export var canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);