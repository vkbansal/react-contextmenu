"use strict";

import React, { PropTypes, Component } from "react";
import FluxComponent from "flummox/component";
import flux from "./flux";
import ContextMenuContainer from "./menu-container";

class ContextMenu extends Component {

    static propTypes = {
        identifier: PropTypes.string.isRequired
    };

    static displayName = "ContextMenu";

    render() {
        return (
            <FluxComponent flux={flux} connectToStores={["menu"]}>
                <ContextMenuContainer {...this.props}/>
            </FluxComponent>
        );
    }
};

export default ContextMenu;
