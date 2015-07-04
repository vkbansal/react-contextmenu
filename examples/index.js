"use strict";

import React from "react";
import Router, { Route, RouteHandler, Redirect, Link } from "react-router";
import SimpleMenu from "./simple-menu";
import MultipleTargets from "./multiple-targets";
import MultipleMenus from "./multiple-menus";

const App = React.createClass({
    displayName: "App",
    render() {
        return (
            <div className="container-fluid">
                <h3>React ContextMenu <small>Context menus using react</small></h3>
                <div className="col-xs-3">
                <ul className="nav nav-pills nav-stacked">
                    <li><Link to="simple-menu">Simple Menu</Link></li>
                    <li><Link to="multiple-targets">Multiple Targets</Link></li>
                    <li><Link to="multiple-menus">Multiple Menus</Link></li>
                </ul>
                </div>
                <div className="col-xs-9" id="main">
                    <RouteHandler/>
                </div>
            </div>
        );
    }
});

const routes = (
    <Route handler={App}>
        <Route name="simple-menu" path="simple-menu" handler={SimpleMenu}/>
        <Route name="multiple-targets" path="multiple-targets" handler={MultipleTargets}/>
        <Route name="multiple-menus" path="multiple-menus" handler={MultipleMenus}/>
        <Redirect from="/" to="simple-menu"/>
    </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.getElementById("main"));
});
