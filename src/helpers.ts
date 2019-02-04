export function callIfExists<T extends any[], U>(func: (..._1: T) => U, ...args: T): U | undefined {
    if (typeof func === 'function') {
        return func(...args)
    };
}

export function hasOwnProp<T>(obj: T, prop: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function uniqueId(): string {
    return Math.random().toString(36).substring(7);
}

export const cssClasses: Record<string, string> = {
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

export const store: Record<string, any> = {};

export const canUseDOM = Boolean(
  typeof window !== 'undefined' && window.document && window.document.createElement
);
