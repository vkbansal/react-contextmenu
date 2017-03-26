[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][dev-deps-image]][dev-deps-url]
[![Code Climate][climate-image]][climate-url]

# React Contextmenu

ContextMenu in React with accessibility support. Live Examples can be found [here](//vkbansal.github.io/react-contextmenu/)

## Table of contents

 - [Installation](#installation)
 - [Browser Support](#browser-support)
 - [Usage](#usage)
 - [Styling](#styling)
 - [API](#api)
 - [FAQs](#faqs)
 - [Contributors](#contributors)
 - [Changelog](#changelog)
 - [License](#license)

## Installation

Using npm

```
npm install --save react-contextmenu
```

Using yarn

```
yarn add react-contextmenu
```

## Browser Support
- IE 11 and Edge >= 12
- FireFox >= 38
- Chrome >= 47
- Opera >= 34
- Safari >= 8

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

### `<ContextMenu />`
Base Contextmenu Component.

#### PropTypes

| Property     | Type     | Required? | Description                                                      |
|--------------|----------|-----------|------------------------------------------------------------------|
| id           | String   | ✓         | A unique identifier for a menu.                                  |
| hideOnLeave  | Boolean  |           | Hides the context menu on mouse leave.                           |
| onMouseLeave | Function |           | Callback called when the mouse leaves the menu or submenu areas. |
| onHide       | Function |           | Callback called when the menu is hidden.                         |
| onShow       | Function |           | Callback called when the menu is shown.                          |
| className    | String   |           | Custom `className` applied to root element of the context-menu.  |

### `<ContextMenuTrigger />`

Contextmenu Trigger Component

#### PropTypes

| Property      | Type                    | Required? | Default | Description                                                                                                                                                                                                                                     |
|---------------|-------------------------|-----------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id            | String                  | ✓         |         | The unique identifier of the menu to be called.                                                                                                                                                                                                 |
| attributes    | Object                  |           |         | The attributes will be passed directly passed to the root element of component. Use this to customize it like adding custom classes, adding `colspan` etc.                                                                                      |
| collect       | Function                |           |         | A simple function which takes `props` as input and returns the data to be passed to contextmenu.                                                                                                                                                  |
| disable       | Boolean                 |           | `false` | Prop to ignore right clicks and display the default browser context menu.                                                                                                                                                                       |
| holdToDisplay | Number                  |           | `1000`  | This is applicable only for touch screens. The time (in ms) for which, user has to hold down his/her finger before the menu is shown.  Note: To disable the long press trigger on left-click just set a negative holdToDisplay value such as `-1` |
| renderTag     | String or React Element |           |         | The element inside which the Component must be wrapped. By default `div` is used. But this prop can used to customize it.                                                                                                                         |

### `<MenuItem />`

A Simple Component for menu items.

#### PropTypes

| Property     | Type     | Required? | Default | Description                                                                                                                                                                                                                                                                |
|--------------|----------|-----------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| onClick      | Function | ✓         |         | The function to be called on click of item. The function will receive three parameters. The first is `event` object. The second is the merged data passed using `props.data` and collect from `ContextMenuTrigger`. The third is the element on which right-click occured. |
| data         | Object   |           | `{}`    | The extra data (if required) to be passed to `onClick` event.                                                                                                                                                                                                              |
| disabled     | Boolean  |           | `false` | If `true`, disables the click event and adds `.disabled` class.                                                                                                                                                                                                            |
| preventClose | Boolean  |           | false   | By default, the context menu is closed as soon as an item is clicked. Set this prop to control this behavior.                                                                                                                                                              |
| attributes   | Object   |           |         | The attributes will be passed directly passed to the root element of `MenuItem`. Use this to customize it like adding custom classes, etc.                                                                                                                                 |

### `<SubMenu />`

A component for using submenus within the contextmenu.

#### PropTypes

| Property   | Type    | Required? | Default | Description                                                                 |
|------------|---------|-----------|---------|-----------------------------------------------------------------------------|
| title      | String  | ✓         |         | The content to be displayed in parent menu.                                 |
| disabled   | Boolean |           | `false` | If `true`, disables the menu from opening and adds `.disabled` class.       |
| hoverDelay | Number  |           | `500`   | The time (in ms) after which the menu is to be displayed when hovered upon. |
| classNames | String  |           |         | Custom `className` applied to root element of the context-menu.             |

## FAQs

**Manually opening the context menu**

If you want a [menu button](http://i.imgur.com/5Qsu2yW.png) that toggles the context menu manually with a regular left click, create a reference to the `ContextMenuTrigger` and pass the click event to `handleContextClick`.

```jsx
let contextTrigger = null;

const toggleMenu = e => {
    if(contextTrigger) {
        contextTrigger.handleContextClick(e);
    }
};

return (
    // Handles right clicking the trigger
    <ContextMenuTrigger ref={c => contextTrigger = c}>
        <img src="artwork.jpg" />
        // The trigger has a menu icon on top of it, allowing for left click
        <button onClick={toggleMenu}>☰</button>
    </ContextMenuTrigger>
    <ContextMenu>
        ...
    </ContextMenu>
);
```

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
