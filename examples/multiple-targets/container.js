"use strict";

import React from "react";
import Target from "./target";

const targets = [{
    name: "Banana"
}, {
    name: "Apple"
}, {
    name: "Papaya"
}, {
    name: "Mango"
}, {
    name: "Orange"
}, {
    name: "Pineapple"
}];

const Container = React.createClass({
    displayName: "Container",
    render() {
        return (
            <div className="row">
                {targets.map((item, i) => (
                    <div className="col-sm-2 text-center" key={i}>
                        <Target name={item.name}/>
                    </div>
                ))}
            </div>
        );
    }
});

export default Container;
