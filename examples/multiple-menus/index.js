"use strict";

import React from "react";
import Container from "./container";
import Menu from "./menu";
import Menu2 from "./menu2";

const MultipleMenus = React.createClass({
    displayName: "MultipleMenus",
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
                <h3>Multiple Menus</h3>
                <p>This demo shows usage of multiple menus on multiple targets.</p>
                <Container/>
                <div>
                {this.state.logs.map((log, i) => (<p key={i}>{log}</p>))}
                </div>
                <Menu addLog={this.addLog}/>
                <Menu2 addLog={this.addLog}/>
            </div>
        );
    }
});

export default MultipleMenus;
