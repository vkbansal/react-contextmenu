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
import { ContextMenu, MenuItem, ContextMenuLayer } from "react-contextmenu";

//Component on which context-menu must be triggred
const MyComponent = ContextMenuLayer("some_unique_identifier", (props) => {
    return {
        prop1: props.myProp
    };
})(React.createClass({
    render() {
        <div className="well"></div>
    }
}));

//The context-menu to be triggered
const MyContextMenu = React.createClass({
    render() {
        <ContextMenu identifier="some_unique_identifier" currentItem={this.currentItem}>
            <MenuItem data={"some_data"} onSelect={this.handleSelect}>
                ContextMenu Item 1
            </MenuItem>
            <MenuItem data={"some_data"} onSelect={this.handleSelect}>
                ContextMenu Item 2
            </MenuItem>
            <MenuItem divider />
            <MenuItem data={"some_data"} onSelect={this.handleSelect}>
                ContextMenu Item 3
            </MenuItem>
        </ContextMenu>
    },
    handleSelect(data, item) {
        console.log(data, item);
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

React.render(<MyApp myProp={12}/>, document.getElementById("main"));
```

As you can see that the `ContextMenu` to be showed on any component is dependent on a **unique identifier**.

The `ContextMenuLayer` decorator takes two parameters. First is the **unique identifier** (same as the one used on the `ContextMenu`) and second is a function that must return some data that will be passed on to the `onSelect` method of the `MenuItem`. This helps in identifying the component on which context click occured.

##Styling

Currently bootstrap `.dropdown-menu` styles are used for styling the menu and are not included in this package. So, do not forget to include the required css files if you are going to use this project.

## Credits
This project is based on the ideas from [react-dnd](https://github.com/gaearon/react-dnd) by [Dan Abramov](https://github.com/gaearon).

## Author

Vivek Kumar Bansal

## License

[MIT] (./LICENSE.md)
