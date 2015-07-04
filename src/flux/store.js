"use strict";

import { Store } from "flummox";

class MenuStore extends Store {
    constructor(flux) {
        super();

        const actions = flux.getActions("menu");
        this.register(actions.setParams, this.onSetParams);

        this.state = {
            x: 0,
            y: 0,
            isVisible: false,
            currentItem: {}
        };
    }

    onSetParams(params) {
        this.setState(params);
    }
}

export default MenuStore;
