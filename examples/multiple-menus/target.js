"use strict";

import React from "react";
import { ContextMenuLayer } from "../../src";

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

export default ContextMenuLayer(
    (props) => (props.menuType),
    (props) => ({
        name: props.name
    })
)(MenuTarget);
