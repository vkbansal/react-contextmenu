"use strict";

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, IndexRoute, hashHistory } from "react-router";
import SimpleMenu from "./simple-menu";
import MultipleTargets from "./multiple-targets";
import MultipleMenus from "./multiple-menus";
import SubMenus from "./submenus";
import Customization from "./customization";

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
                        <li>
                            <Link to="/submenus">Sub Menus</Link>
                        </li>
                        <li>
                            <Link to="/customization">Customization</Link>
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
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={SimpleMenu}/>
            <Route path="simple-menu" component={SimpleMenu}/>
            <Route path="multiple-targets" component={MultipleTargets}/>
            <Route path="multiple-menus" component={MultipleMenus}/>
            <Route path="submenus" component={SubMenus}/>
            <Route path="customization" component={Customization}/>
        </Route>
    </Router>
);

ReactDOM.render(Routes, document.getElementById("main"));
