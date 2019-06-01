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
    menuItemActive: 'react-contextmenu-item--active',
    menuItemDisabled: 'react-contextmenu-item--disabled',
    menuItemDivider: 'react-contextmenu-item--divider',
    menuItemSelected: 'react-contextmenu-item--selected',
    subMenu: 'react-contextmenu-submenu'
};

export const store = {};

export const canUseDOM = Boolean(
  typeof window !== 'undefined' && window.document && window.document.createElement
);

// Locate the document element that contains a specified element
//
// This function looks to see if the element is contained within a shadow DOM and returns the
// appropriate document (or fragment) element that applies.  The returned node will be one of the
// following:
//
//  - `null`: when node is `null`, not browser or invalid environment
//  - `document`: if the node is NOT contained within a shadow DOM
//  - instance of `DocumentFragment`: when the node IS contained within a shadow DOM
export function getDocumentNode(startingAt) {
    let node = startingAt;
    while (node !== null) {
        switch (node.nodeType) {
            case Node.DOCUMENT_NODE: // master document node
            case Node.DOCUMENT_FRAGMENT_NODE: // used by shadow DOM
                return node;

            default:
        }

        node = node.parentNode;
    }

    // Return whatever document is; resolves test failures.
    return document;
}
