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

export default ContextMenuLayer((props) => {
    return props.menuType;
}, (props) => {
    return {
        name: props.name
    };
})(MenuTarget);
