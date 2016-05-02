"use strict";

import React from "react";
import { ContextMenuLayer } from "../../src";
import MenuTypes from "./constants";

const MenuTarget = React.createClass({
    displayName: "MenuTarget",
    render() {
        return (
            <td>{this.props.name}</td>
        );
    }
});

export default ContextMenuLayer(MenuTypes.multi, (props) => ({
    name: props.name
}))(MenuTarget);
