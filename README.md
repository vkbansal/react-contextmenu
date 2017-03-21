[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][dev-deps-image]][dev-deps-url]
[![Code Climate][climate-image]][climate-url]

# React Contextmenu

ContextMenu in React. Live Examples can be found [here](//vkbansal.github.io/react-contextmenu/)


## Installation

```
npm install --save react-contextmenu
```



## Usage

You need to setup two things:
1. The `ContextMenu`
2. The `ContextMenuTrigger`

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

function handleClick(e, data) {
  console.log(data);
}

function MyApp() {
  return (
    <div>

      <ContextMenuTrigger id="some_unique_identifier">
        <div className="well">Right click to see the menu</div>
      </ContextMenuTrigger>

      <ContextMenu id="some_unique_identifier">
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

    </div>
  );
}

ReactDOM.render(<MyApp myProp={12}/>, document.getElementById("main"));
```

As you can see that the `ContextMenu` to be showed on any component is dependent on a **unique id**.

See [examples](./examples) for more in detail usage.



## Styling

The styling can be apllied to using following classes.

- `react-contextmenu` : applied to menu root element.
- `react-contextmenu--visible` : applied to menu root element when visible.
- `react-contextmenu-item` : applied to menu items.
- `react-contextmenu-item--active` : applied to menu items and title in submenu when submenu is open.
- `react-contextmenu-item--disabled` : applied to menu items and title in submenu when they are disabled.
- `react-contextmenu-item--divider` : applied to menu items with the `divider` prop.
- `react-contextmenu-wrapper` : applied to wrapper around elements in `ContextMenuTrigger`.
- `react-contextmenu-submenu` : applied to items that are submenus.

> Note: This package does note include any styling by default. You can use [react-contextmenu.css](./examples/react-contextmenu.css) from examples for quick setup.


## API

The module exports the following:

- `ContextMenu`
- `ContextMenuTrigger`
- `MenuItem`
- `SubMenu`




### ContextMenu(props)

Type: React Component

Base Contextmenu Component.

**props.id**

Type: `String`  required

A unique identifier for the menu.

**props.hideOnLeave**

Type: `Boolean` (optional)

Hides the context menu on mouse leave.

**props.onMouseLeave**

Type: `Function` (optional)

Callback called when the mouse leaves the menu or submenu areas.

**props.onHide**

Type: `Function` (optional)

Callback called when the menu is hidden.

**props.onShow**

Type: `Function` (optional)

Callback called when the menu is shown.

**props.className**

Type: `String` (optional)

Custom `className` applied to root element of the context-menu.



### ContextMenuTrigger(props)

Type: React Component

Contextmenu Trigger Component

**props.id**

Type: `String` (required)

The unique identifier of the menu to be called.

**props.attributes**

Type: `Object` (optional)

The attributes will be passed directly passed to the root element of component. Use this to customize it like adding custom classes, adding `colspan` etc.

**props.collect**

Type: `Function` (optional)

A simple function which takes `props` as input and returns the data to be passed to contextmenu.

**props.disable**

Type: `Boolean` (optional, default: false)

Prop to ignore right clicks and display the default browser context menu.

**props.holdToDisplay**

Type: `Number` (optional)

Default: `1000`

This is applicable only for touch screens. The time (in ms) for which, user has to hold down his/her finger before the menu is shown.

> Note: To disable the long press trigger on left-click just set a negative holdToDisplay value such as `-1`

**props.renderTag**

Type: `String` or React Element (optional)

The element inside which the Component must be wrapped. By default `div` is used. But this prop can used to customize it.



### MenuItem(props)

Type: React Component

A Simple Component for menu items.

**props.onClick**

Type: `Function` (required)

The function to be called on click of item. The function will receive three parameters.

-   The first is `event` object.
-   The second is the merged data passed using `props.data` and `collect` from `ContextMenuTrigger`.
-   The third is the `element` on which right-click occured.

**props.data**

Type: `Object` (optional)

Default: `{}`

The extra data (if required) to be passed to `onClick` event.

**props.disabled**

Type: `Boolean` (optional)

Default: `false`

If `true`, disables the click event and adds `.disabled` class.

**props.preventClose**

Type: `Boolean` (optional)

Default: `false`

By default, the context menu is closed as soon as an item is clicked. Set this prop to control this behavior.

**props.attributes**

Type: `Object` (optional)

The attributes will be passed directly passed to the root element of `MenuItem`. Use this to customize it like adding custom classes, etc.



### SubMenu(props)

Type: React Component

A component for using submenus within the contextmenu.

**props.title**

Type: `String` (required)

The content to be displayed in parent menu.

**props.disabled**

Type: `Boolean` (optional)

Default: `false`

If `true`, disables the menu from opening and adds `.disabled` class.

**props.hoverDelay**

Type: `Number` (optional)

Default: `500`

The time (in ms) after which the menu is to be displayed when hovered upon.

**props.className**

Type: `String` (optional)

Custom `className` applied to root element of the context-menu.

## Contributors

[All Contributors](https://github.com/vkbansal/react-contextmenu/graphs/contributors)

## Changelog

For Changelog, see [releases](https://github.com/vkbansal/react-contextmenu/releases)

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
