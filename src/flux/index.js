"use strict";

import { Flummox } from "flummox";
import MenuActions from "./actions";
import MenuStore from "./store";

class Flux extends Flummox {
    constructor() {
        super();

        this.createActions("menu", MenuActions);
        this.createStore("menu", MenuStore, this);
    }
}

export default new Flux();
