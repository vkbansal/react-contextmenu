"use strict";

import React from "react";
import Container from "./container";
import Menu from "./menu";

const Customization = React.createClass({
    displayName: "Customization",
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
                <h3>Custom Wrappers</h3>
                <p>This demo shows usage of customization. Instead of using <code>div</code>s by default, we are using <code>tr</code>s</p>
                <Container/>
                <div>
                {this.state.logs.map((log, i) => (<p key={i}>{log}</p>))}
                </div>
                <Menu addLog={this.addLog}/>
            </div>
        );
    }
});

export default Customization;
