"use strict";

import flux from "./flux";

const { state } = flux.getStore("menu");

export default {
    getItem() {
        return state.currentItem;
    },
    getPosition() {
        let { x, y } = state;
        return {x, y};
    }
};
