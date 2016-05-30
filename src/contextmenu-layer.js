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
            mouseDown: false,
            getDefaultProps() {
                return {
                    renderTag: "div",
                    attributes: {}
                };
            },
            handleMouseDown(event){
              console.log(this.props.holdToDisplay)
              if (this.props.holdToDisplay >= 0 && event.button === 0) {
                event.persist()

                this.mouseDown = true;
                setTimeout(() => {
                  if (this.mouseDown){
                    this.handleContextClick(event)
                  }
                }, this.props.holdToDisplay);
              }
            },
            handleMouseUp(event){
              if (event.button === 0) {
                this.mouseDown = false;
              }
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
            render() {
                let { attributes: {className = "", ...attributes}, renderTag, ...props } = this.props;

                attributes.className = `react-context-menu-wrapper ${className}`;
                attributes.onContextMenu = this.handleContextClick;
                attributes.onMouseDown = this.handleMouseDown;
                attributes.onMouseUp = this.handleMouseUp;

                return React.createElement(
                    renderTag,
                    attributes,
                    React.createElement(Component, props)
                );
            }
        });
    };
}
