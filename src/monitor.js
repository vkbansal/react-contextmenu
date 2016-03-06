"use strict";

import store from "./redux/store";

export default {
    getItem() {
        return store.getState().currentItem;
    },
    getPosition() {
        let { x, y } = store.getState();

        return {x, y};
    },
    hideMenu() {
        store.dispatch({
            type: "SET_PARAMS",
            data: {
                isVisible: false,
                currentItem: {}
            }
        });
    }
};
