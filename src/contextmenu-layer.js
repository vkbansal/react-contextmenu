"use strict";

import React from "react";
import invariant from "invariant";
import _isObject from "lodash.isobject";

import store from "./redux/store";
import tagAttributes from "./tag-attributes.js";

export default function(identifier, configure) {
    return function(Component) {
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

        if (configure) {
            invariant(
                typeof configure === "function",
                "Expected configure to be a function. See %s",
                displayName
            );
        }


        return React.createClass({
            displayName: `${displayName}ContextMenuLayer`,
            getDefaultProps() {
                return {
                    renderTag: "div",
                    attributes: {}
                };
            },
            handleContextClick(event) {
                let currentItem = typeof configure === "function"
                    ? configure(this.props)
                    : {};

                invariant(
                    _isObject(currentItem),
                    "Expected configure to return an object. See %s",
                    displayName
                );

                event.preventDefault();

                store.dispatch({
                    type: "SET_PARAMS",
                    data: {
                        x: event.clientX,
                        y: event.clientY,
                        currentItem,
                        isVisible: typeof identifier === "function" ? identifier(this.props) : identifier
                    }
                });
            },
            render: function() {

                var attributeArray = tagAttributes.toAttributeArray(this.props.attributes);
                var classNames = tagAttributes.getClassNames(this.props.attributes);

                //Make sure to add the react-context-menu-wrapper information
                attributeArray["className"] = "react-context-menu-wrapper" + classNames;
                attributeArray["onContextMenu"] = this.handleContextClick;

                return React.createElement(this.props.renderTag, attributeArray, React.createElement(Component, this.props));
            }
        });
    };
}
