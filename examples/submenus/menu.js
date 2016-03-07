"use strict";

import React from "react";
import { ContextMenu, MenuItem, SubMenu } from "../../src";
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
                <SubMenu title="A SubMenu">
                    <MenuItem onClick={this.handleClick} data={{item: "subitem 1"}}>Sub Item 1</MenuItem>
                    <SubMenu title="Another SubMenu">
                        <MenuItem onClick={this.handleClick} data={{item: "subitem 1"}}>Sub Item 1</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{item: "subitem 2"}}>Sub Item 2</MenuItem>
                    </SubMenu>
                    <MenuItem onClick={this.handleClick} data={{item: "subitem 2"}}>Sub Item 2</MenuItem>
                </SubMenu>
            </ContextMenu>
        );
    }
});

export default Menu;
