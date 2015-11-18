"use strict";

import React from "react";
import { render } from "react-dom";
import { Router, Route, Link, IndexRoute } from "react-router";
import SimpleMenu from "./simple-menu";
import MultipleTargets from "./multiple-targets";
import MultipleMenus from "./multiple-menus";

const App = React.createClass({
    displayName: "App",
    render() {
        let { children } = this.props;
        return (
            <div className="container-fluid">
                <h3>React ContextMenu <small>Context menus using react</small></h3>
                <div className="col-xs-3">
                <ul className="nav nav-pills nav-stacked">
                    <li>
                        <Link to="/simple-menu">Simple Menu</Link>
                    </li>
                    <li>
                        <Link to="/multiple-targets">Multiple Targets</Link>
                    </li>
                    <li>
                        <Link to="/multiple-menus">Multiple Menus</Link>
                    </li>
                </ul>
                </div>
                <div className="col-xs-9" id="main">
                    {children}
                </div>
            </div>
        );
    }
});

const Routes = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={SimpleMenu}/>
            <Route path="simple-menu" component={SimpleMenu}/>
            <Route path="multiple-targets" component={MultipleTargets}/>
            <Route path="multiple-menus" component={MultipleMenus}/>
        </Route>
    </Router>
);

render(Routes, document.getElementById("main"));
