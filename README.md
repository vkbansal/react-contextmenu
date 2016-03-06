[![NPM version][npm-image]][npm-url]
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

```jsx
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
            <MenuItem data={"some_data"} onClick={this.handleClickClick}>
                ContextMenu Item 2
            </MenuItem>
            <MenuItem divider />
            <MenuItem data={"some_data"} onClick={this.handleClickClick}>
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

##Styling

The styling can be apllied to using following classes.

- `react-context-menu`
- `react-context-menu-item`
- `react-context-menu-link`

See [react-context-menu.css](./examples/react-context-menu.css) for example.

## Credits
This project is based on the ideas from [react-dnd](https://github.com/gaearon/react-dnd) by [Dan Abramov](https://github.com/gaearon).

## License

[MIT] (./LICENSE.md). Copyright(c) [Vivek Kumar Bansal](http://vkbansal.me/)

[npm-url]: https://npmjs.org/package/react-contextmenu
[npm-image]: http://img.shields.io/npm/v/react-contextmenu.svg?style=flat-square

[deps-url]: https://david-dm.org/vkbansal/react-contextmenu
[deps-image]: https://img.shields.io/david/vkbansal/react-contextmenu.svg?style=flat-square

[dev-deps-url]: https://david-dm.org/vkbansal/react-contextmenu
[dev-deps-image]: https://img.shields.io/david/dev/vkbansal/react-contextmenu.svg?style=flat-square

[climate-url]: https://codeclimate.com/github/vkbansal/react-contextmenu
[climate-image]: http://img.shields.io/codeclimate/github/vkbansal/react-contextmenu.svg?style=flat-square