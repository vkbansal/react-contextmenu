"use strict";

import flux from "./flux";

export default {
    getItem() {
        return flux.getStore("menu").state.currentItem;
    },
    getPosition() {
        let { x, y } = flux.getStore("menu").state;

        return {x, y};
    }
};
