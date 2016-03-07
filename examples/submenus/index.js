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
                <h3>Sub Menus</h3>
                <p>This demo shows simple usage of <code>&lt;SubMenu/&gt;</code> inside context menu.</p>
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
