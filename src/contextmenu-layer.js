"use strict";

import React from "react";
import invariant from "invariant";
import _isObject from "lodash.isobject";

import store from "./redux/store";

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
                    renderTag: "div"
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
            toAttributeArray: function(attributes){

                var attributeArray = [];
                for(var key in attributes){
                    if(attributes.hasOwnProperty(key)){
                        attributeArray[key] = attributes[key];
                    }
                }
                return attributeArray;
            },
            getClassNames: function(attributes){

                var classNames = "";
                for(var key in attributes){
                    if(attributes.hasOwnProperty(key)){
                        if(key == "className"){
                            classNames = classNames + " " + attributes[key];
                        }
                    }
                }
                return classNames;
            },
            render: function() {

                var attributes = this.props.attributes;
                if(attributes == undefined) attributes = {};

                var attributeArray = this.toAttributeArray(attributes);
                var classNames = this.getClassNames(attributes);

                //Make sure to add the react-context-menu-wrapper information
                attributeArray["className"] = "react-context-menu-wrapper" + classNames;
                attributeArray["onContextMenu"] = this.handleContextClick;

                return React.createElement(this.props.renderTag, attributeArray, React.createElement(Component, this.props));
            }
        });
    };
}
