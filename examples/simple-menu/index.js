"use strict";

import React from "react";
import Container from "./container";
import Menu from "./menu";

const SimpleMenu = React.createClass({
    displayName: "SimpleMenu",
    render() {
        return (
            <div>
                <h3>Simple Menu</h3>
                <p>This demo simple usage of a context menu.</p>
                <Container />
                <Menu/>
            </div>
        );
    }
});

export default SimpleMenu;
