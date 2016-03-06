"use strict";

import React from "react";
import Container from "./container";
import Menu from "./menu";

const MultipleTargets = React.createClass({
    displayName: "MultipleTargets",
    getInitialState() {
        return { logs: [] };
    },
    addLog(log) {
        this.setState({
            logs: this.state.logs.concat(log)
        });
    },
    render() {
        return (
            <div>
                <h3>Multiple Targets</h3>
                <p>This demo shows usage of same menu on multiple targets.</p>
                <Container/>
                <div>
                {this.state.logs.map((log, i) => (<p key={i}>{log}</p>))}
                </div>
                <Menu addLog={this.addLog}/>
            </div>
        );
    }
});

export default MultipleTargets;
