# API

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
