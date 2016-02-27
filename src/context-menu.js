"use strict";

import React from "react";
import FluxComponent from "flummox/component";
import flux from "./flux";
import ContextMenuContainer from "./menu-container";

let { PropTypes, Component } = React;

class ContextMenu extends Component {

    static displayName = "ContextMenu";

    static propTypes = {
        identifier: PropTypes.string.isRequired
    };

    render() {
        return (
            <FluxComponent flux={flux} connectToStores={["menu"]}>
                <ContextMenuContainer {...this.props}/>
            </FluxComponent>
        );
    }
}

export default ContextMenu;
