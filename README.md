[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][dev-deps-image]][dev-deps-url]
[![Code Climate][climate-image]][climate-url]

# React ContextMenu

ContextMenu in React.

## Installation

```
npm install --save react-contextmenu
```

## Usage

You need to setup two things:
1. The `ContextMenu`
2. The Component on which the `ContextMenu` must be invoked.

```js
import React from "react";
import ReactDOM from "react-dom";
import { ContextMenu, MenuItem, ContextMenuLayer } from "react-contextmenu";

//Component on which context-menu must be triggred
const MyComponent = ContextMenuLayer("some_unique_identifier")(
    React.createClass({
        render() {
            <div className="well"></div>
        }
    })
);

//The context-menu to be triggered
const MyContextMenu = React.createClass({
    render() {
        <ContextMenu identifier="some_unique_identifier" currentItem={this.currentItem}>
            <MenuItem data={"some_data"} onClick={this.handleClick}>
                ContextMenu Item 1
            </MenuItem>
            <MenuItem data={"some_data"} onClick={this.handleClick}>
                ContextMenu Item 2
            </MenuItem>
            <MenuItem divider />
            <MenuItem data={"some_data"} onClick={this.handleClick}>
                ContextMenu Item 3
            </MenuItem>
        </ContextMenu>
    },
    handleClick(e, data) {
        console.log(data);
    }
});

const MyApp = React.createClass({
    render() {
        <div>
            <MyComponent {...this.props}/>
            <MyContextMenu />
        </div>
    }
});

ReactDOM.render(<MyApp myProp={12}/>, document.getElementById("main"));
```

As you can see that the `ContextMenu` to be showed on any component is dependent on a **unique identifier**.

The `ContextMenuLayer` higher order function takes two parameters. First is the **unique identifier** (same as the one used on the `ContextMenu`) and second is (optional) a function that must return some data that will be passed on to the `onClick` method of the `MenuItem`. This helps in identifying the component on which context click occured.

See [examples](./examples) for more in detail usage.

##Styling

The styling can be apllied to using following classes.

- `react-context-menu` : applied to menu root element.
- `react-context-menu-item` : applied to menu items.
- `react-context-menu-link` : applied to menu links inside items.
- `react-context-menu-wrapper` : applied to wrapper around elements in `ContextMenuLayer`.
- `submenu` : applied to items that are submenus.
- `disabled` : applied to links (title in submenu) when they are disabled.
- `active` : applied to title in submenu when submenu is open.

See [react-context-menu.css](./examples/react-context-menu.css) for example.


## API

The module exports the following:

- `ContextMenu`
- `ContextMenuLayer`
- `MenuItem`
- `SubMenu`
- `monitor`
- `connect`


### ContextMenu(props)

Type: React Component

Base Contextmenu Component.

**props.identifier**

Type: `String`  required

A unique identifier for the menu.

### ContextMenuLayer(identifier, configure)

Type: `Function`

Return: `Function`

A Higher Order function that returns a function which in turn can be used to create a React Component on which the context menu must be triggered.

**identifier**

Type: `String` required

The unique identifier of the menu to be called.

**configure**

Type: `Function` optional

A simple function which takes props as input and returns the data to be passed to contextmenu.

### MenuItem(props)

Type: React Component

A Simple Component for menu items.

**props.data**

Type: `Object` optional

Default: `{}`

The extra data (if required) to be passed to `onClick` event.

**props.disabled**

Type: `Boolean` optional

Default: `false`

If `true`, disables the click event and adds `.disabled` class.

**props.onClick**

Type: `Function` required

The function to be called on click of item. The function will receive two parameters. The first is `event` object and the second is the extra data passed either using `props.data` or configure from `ContextMenuLayer`.

**props.preventClose**

Type: `Boolean` optional

Default: `false`

By default, the context menu is closed as soon as an item is clicked. Set this prop to control this behavior.

**props.attributes**

Type: `Object` optional

The attributes will be passed directly passed to the root element of `MenuItem`. Use this to customize it like adding custom classes, etc.

### SubMenu(props)

Type: React Component

A component for using submenus within the contextmenu.

**props.title**

Type: `String` required

The content to be displayed in parent menu.

**props.hoverDelay**

Type: `Number` optional

Default: 500

The time (in ms) after which the menu is to be displayed when hovered upon.

**props.disabled**

Type: `Boolean` optional

Default: `false`

If `true`, disables the menu from opening and adds `.disabled` class.

### monitor

Type: `Object`

A utility object.

**monitor.getItem()**

Type: `Function`

Returns: `Object`

A getter for the data passed to contextmenu, which is set using `configure`.

**monitor.getPosition()**

Type: `Function`

Returns: `Object`

Gives the position of the current or last active contextmenu.

**monitor.hideMenu()**

Type: `Function`

A utility function to hide the currently active contextmenu programmatically.

### connect(Menu)

Type: `Function`

Returns: React Component

A simple wrapper to be used when different items must be rendered based on which component was (right) clicked.

**Menu**

Type: React Component

The `Menu` component that needs to be updated depending on the current selection. The component will receive object from `monitor.getItem()` in its props with `item` as key. All the other props will be simply passed through.

## Customization
The higher order component created using `ContextMenuLayer` can accept the following props.

**renderTag**

Type: React Element (optional)

The element inside which the Component must be wrapped. By default `div` is used. But this prop can used to customize it.

**attributes**

Type: `Object` optional

The attributes will be passed directly passed to the root element of component. Use this to customize it like adding custom classes, adding `colspan` etc.

```js
// following examples shows usage of `tr` instead of `div`

import { ContextMenuLayer } from "react-contextmenu";
import MenuTarget from "./menu-target";

const Item = ContextMenuLayer("identifier")(MenuTarget);

const App = React.createClass({
    render() {
        return (
            <table>
                <tbody>
                    {this.props.items.map((item, i) => (
                        <Item renderTag="tr" key={i} item={item}/>
                    ))}
                </tbody>
            </table>
        );
    }
});
```

## Credits
This project is based on the ideas from [react-dnd](https://github.com/gaearon/react-dnd) by [Dan Abramov](https://github.com/gaearon).

## License

[MIT](./LICENSE.md). Copyright(c) [Vivek Kumar Bansal](http://vkbansal.me/)

[npm-url]: https://npmjs.org/package/react-contextmenu
[npm-image]: http://img.shields.io/npm/v/react-contextmenu.svg?style=flat-square

[travis-url]: https://travis-ci.org/vkbansal/react-contextmenu
[travis-image]: http://img.shields.io/travis/vkbansal/react-contextmenu/master.svg?style=flat-square

[deps-url]: https://david-dm.org/vkbansal/react-contextmenu
[deps-image]: https://img.shields.io/david/vkbansal/react-contextmenu.svg?style=flat-square

[dev-deps-url]: https://david-dm.org/vkbansal/react-contextmenu
[dev-deps-image]: https://img.shields.io/david/dev/vkbansal/react-contextmenu.svg?style=flat-square

[climate-url]: https://codeclimate.com/github/vkbansal/react-contextmenu
[climate-image]: http://img.shields.io/codeclimate/github/vkbansal/react-contextmenu.svg?style=flat-square
