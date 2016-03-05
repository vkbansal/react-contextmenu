"use strict";

import { createStore } from "redux";
import rootReducer from "./reducers";

export default createStore(rootReducer);
