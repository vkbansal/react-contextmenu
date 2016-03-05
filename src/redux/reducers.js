"use strict";

import assign from "object-assign";

const defaultState = {
    x: 0,
    y: 0,
    isVisible: false,
    currentItem: {}
};

export default function(state = defaultState, action) {
    return action.type === "SET_PARAMS"
        ? assign({}, state, action.data)
        : state;
}
