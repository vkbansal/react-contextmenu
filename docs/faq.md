# FAQs

**Long left click triggers context menu**

As metioned in [API docs](), to disable the long press trigger on left-click just set a negative `holdToDisplay` value such as `-1`;

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
