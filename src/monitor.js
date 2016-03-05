"use strict";

import store from "./redux/store";

export default {
    getItem() {
        return store.getState().currentItem;
    },
    getPosition() {
        let { x, y } = store.getState();

        return {x, y};
    }
};
