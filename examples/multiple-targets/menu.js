"use strict";

import React from "react";
import { ContextMenu, MenuItem, connect } from "../../src";
import MenuTypes from "./constants";

const Menu = React.createClass({
    displayName: "Menu",
    handleClick(e, data) {
        this.props.addLog(`Clicked on menu ${data.item} on ${data.name}`);
    },
    handleEat(e, data) {
        this.props.addLog(`Must Eat ${data.name}`);
    },
    render() {
        let { name } = this.props.item;

        return (
            <ContextMenu identifier={MenuTypes.multi}>
                <MenuItem onClick={this.handleClick} data={{item: "item 1"}}>Menu Item 1</MenuItem>
                <MenuItem onClick={this.handleClick} data={{item: "item 2"}}>Menu Item 2</MenuItem>
                <MenuItem onClick={this.handleEat}>Eat {name}</MenuItem>
            </ContextMenu>
        );
    }
});

export default connect(Menu);
