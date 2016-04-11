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
            <table className="table table-bordered">
                <tbody>
                {targets.map((item, i) => (
                    <Target renderTag="tr" name={item.name} key={i}/>
                ))}
                </tbody>
            </table>
        );
    }
});

export default Container;
