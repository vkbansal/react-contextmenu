"use strict";

import React from "react";
import Container from "./container";
import Menu from "./menu";

const SimpleMenu = React.createClass({
    displayName: "SimpleMenu",
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
                <h3>Simple Menu</h3>
                <p>This demo simple usage of a context menu.</p>
                <Container addLog={this.addLog}/>
                <div>
                {this.state.logs.map((log, i) => (<p key={i}>{log}</p>))}
                </div>
                <Menu addLog={this.addLog}/>
            </div>
        );
    }
});

export default SimpleMenu;
