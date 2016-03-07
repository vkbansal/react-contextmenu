"use strict";

import React from "react";
import { ContextMenuLayer } from "../../src";
import MenuTypes from "./constants";

const Container = React.createClass({
    displayName: "Container",
    render() {
        return (
            <div className="well">right click to see the menu</div>
        );
    }
});

export default ContextMenuLayer(MenuTypes.simple, (props) => props)(Container);
