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
                    <MenuItem onClick={this.handleClick} data={{item: "subitem 1"}}>SubItem 1</MenuItem>
                    <SubMenu title="Another SubMenu">
                        <MenuItem onClick={this.handleClick} data={{item: "subsubitem 1"}}>SubSubItem 1</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{item: "subsubitem 2"}}>SubSubItem 2</MenuItem>
                    </SubMenu>
                    <SubMenu title="Yet Another SubMenu">
                        <MenuItem onClick={this.handleClick} data={{item: "subsubitem 3"}}>SubSubItem 3</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{item: "subsubitem 4"}}>SubSubItem 4</MenuItem>
                    </SubMenu>
                    <MenuItem onClick={this.handleClick} data={{item: "subitem 2"}}>SubItem 2</MenuItem>
                </SubMenu>
            </ContextMenu>
        );
    }
});

export default Menu;
