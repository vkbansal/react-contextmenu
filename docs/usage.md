# Usage

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
