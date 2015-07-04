"use strict";

import React from "react";
import Target from "./target";
import MenuTypes from "./constants";


const Container = React.createClass({
    displayName: "Container",
    render() {
        return (
            <div className="row">
                <div className="col-sm-6 text-center">
                    <Target name="Target 1" menuType={MenuTypes.menu}/>
                </div>
                <div className="col-sm-6 text-center">
                    <Target name="Target 2" menuType={MenuTypes.menu2}/>
                </div>
            </div>
        );
    }
});

export default Container;
