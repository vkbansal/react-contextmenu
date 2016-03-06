"use strict";

import React from "react";
import { ContextMenu, MenuItem } from "../../src";
import MenuTypes from "./constants";

const Menu = React.createClass({
    displayName: "Menu",
    handleClick(e, data) {
        this.props.addLog(`Clicked on menu ${data.item}`);
    },
    render() {
        return (
            <ContextMenu identifier={MenuTypes.simple}>
                <MenuItem onClick={this.handleClick} data={{item: "item 1"}}>Menu Item 1</MenuItem>
                <MenuItem onClick={this.handleClick} data={{item: "item 2"}}>Menu Item 2</MenuItem>
            </ContextMenu>
        );
    }
});

export default Menu;
