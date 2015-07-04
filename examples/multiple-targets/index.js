"use strict";

import React from "react";
import Container from "./container";
import Menu from "./menu";

const MultipleTargets = React.createClass({
    displayName: "MultipleTargets",
    render() {
        return (
            <div>
                <h3>Multiple Targets</h3>
                <p>This demo shows usage of same menu on multiple targets.</p>
                <Container />
                <Menu/>
            </div>
        );
    }
});

export default MultipleTargets;
