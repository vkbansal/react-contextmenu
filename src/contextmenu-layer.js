"use strict";

import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import invariant from "invariant";
import _isObject from "lodash.isobject";
import autobind from "autobind-decorator";

import flux from "./flux";

export default function (identifier, configure) {
    return function (Component) {
        const displayName = Component.displayName
            || Component.name
            || "Component";

        invariant(
            identifier && (typeof identifier === "string"
                || typeof identifier === "symbol"
                || typeof identifier === "function"),
            "Expected identifier to be string, symbol or function. See %s",
            displayName
        );

        invariant(
            typeof configure === "function",
            "Expected configure to be a function. See %s",
            displayName
        );

        return class extends Component {

            static displayName = `${displayName}ContextMenuLayer`;

            componentDidMount() {
                document
                    .addEventListener("contextmenu", this.handleContextClick);
            }

            componentWillUnmount() {
                document
                    .removeEventListener("contextmenu", this.handleContextClick);
            }

            @autobind
            handleContextClick(event) {
                let target = event.target;
                let domNode = findDOMNode(this);
                if(target == domNode || domNode.contains(target)) {
                    let currentItem = configure(this.props);

                    invariant(
                        _isObject(currentItem),
                        "Expected configure to return an object. See %s",
                        displayName
                    );

                    event.preventDefault();
                    const actions = flux.getActions("menu");
                    actions.setParams({
                        x: event.clientX,
                        y: event.clientY,
                        currentItem,
                        isVisible: typeof identifier === "function" ? identifier(this.props) : identifier
                    });
                }
            }

            render() {
                return (
                    <Component {...this.props} identifier={identifier} />
                );
            }
        };
    };
}
