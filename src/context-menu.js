"use strict";

import React from "react";
import FluxComponent from "flummox/component";
import flux from "./flux";
import ContextMenuContainer from "./menu-container";

let { PropTypes } = React;

const ContextMenu = React.createClass({
    displayName: "ContextMenu",
    propTypes: {
        identifier: PropTypes.string.isRequired
    },
    render() {
        return (
            <FluxComponent flux={flux} connectToStores={["menu"]}>
                <ContextMenuContainer {...this.props}/>
            </FluxComponent>
        );
    }
});

export default ContextMenu;
