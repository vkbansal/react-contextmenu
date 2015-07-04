"use strict";

import React from "react";
import { ContextMenuLayer } from "../../src";
import MenuTypes from "./constants";

const MenuTarget = React.createClass({
    displayName: "MenuTarget",
    render() {
        return (
            <div className="well">
                {this.props.name}
            </div>
        );
    }
});

export default ContextMenuLayer(MenuTypes.multi, (props) => {
    return {
        name: props.name
    };
})(MenuTarget);
