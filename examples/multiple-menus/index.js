"use strict";

import React from "react";
import Container from "./container";
import Menu from "./menu";
import Menu2 from "./menu2";

const MultipleMenus = React.createClass({
    displayName: "MultipleMenus",
    render() {
        return (
            <div>
                <h3>Multiple Menus</h3>
                <p>This demo shows usage of multiple menus on multiple targets.</p>
                <Container />
                <Menu/>
                <Menu2 />
            </div>
        );
    }
});

export default MultipleMenus;
