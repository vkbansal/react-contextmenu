"use strict";

import React from "react";
import { ContextMenu, MenuItem } from "../../src";
import MenuTypes from "./constants";

const Menu = React.createClass({
    displayName: "Menu",
    handleClick(e, data) {
        this.props.addLog(`Clicked on menu 1 ${data.item} on ${data.name}`);
    },
    render() {
        return (
            <ContextMenu identifier={MenuTypes.menu}>
                <MenuItem onClick={this.handleClick} data={{item: "item 1"}}>Menu 1 Item 1</MenuItem>
                <MenuItem onClick={this.handleClick} data={{item: "item 2"}}>Menu 1 Item 2</MenuItem>
            </ContextMenu>
        );
    }
});

export default Menu;
