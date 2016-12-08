export function callIfExists(func, ...args) {
    return (typeof func === 'function') && func(...args);
}

export function hasOwnProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function uniqueId() {
    return Math.random().toString(36).substring(7);
}

export const cssClasses = {
    menu: 'react-contextmenu',
    menuVisible: 'react-contextmenu--visible',
    menuWrapper: 'react-contextmenu-wrapper',
    menuItem: 'react-contextmenu-item',
    menuLink: 'react-contextmenu-link',
    menuLinkActive: 'react-contextmenu-link--active',
    menuLinkDisabled: 'react-contextmenu-link--disabled',
    subMenu: 'react-contextmenu-submenu'
};

export const store = {};

export const canUseDOM = Boolean(
  typeof window !== 'undefined' && window.document && window.document.createElement
);
