# Changelog

All the changes can be found below. Order used:

- Added
- Changed
- Deprecated
- Removed
- Fixed
- Security

## v1.6.1

### Fixed
- fixed `cannot read parentNode of undefined` (#19)

## v1.6.0

### Added
- Added touch support (#17)

### Fixed
- Fix: error while unmounting the component (#16)
- Fix: when context menu is showing, right click shows the browser's context menu (#14)

## v1.5.0

### Added
- Added `attributes` prop to `MenuItem` and `ContextMenuLayer` for further customization.

## v1.4.0

### Added
- Added examples for custom wrappers using `renderTag`.
- Added support for `react v15.0`.

## v1.3.0

### Added

- Added `renderTag` prop to customize the wrapper inside `ContextMenuLayer`.

## v1.2.0

### Added

- Added `connect` helper to render different items based on which component was (right) clicked.

## v1.1.1

### Fixed
- Fixed `getDefaultProps` in `<MenuItem/>`.

## v1.1.0

### Added

- Support for nested sub-menus.
- More custom styling options.
- Proper API documentation.

### Removed
- Hard Dependency on `react-dom` inside components.

## v1.0.1

### Changed
- Internal: use `getBoundingClientRect()` instead of `offsetHeight` and `offsetWidth`.
- Internal: Update packages and scripts.

### Fixed
- Fix class names (`.react-context-menu-link`) for links.

## v1.0.0

### Added

- Ability to use custom styles.

### Changed

- Use `react-bootstap/react-overlays` instead of custom logic to render the menu.
- Make `configure` of `ContextMenuLayer` optional.

### Removed

- Dependency on bootstrap styling.


## v0.4.0

### Changed
- Replace `webpack-dev-server` with `react-hmre`.
- Revert to use `createClass`.
- Switch to Redux from Flummox.

### Fixed
 - Menu goes outside when closer to edges.

## v0.3.0

### Added
- Compatibility for react-0.14.

### Changed
- Updated to babel 6.

### Fixed
- Fixed unbind event handlers.

## v0.2.2

### Added
 - Add compatibility with IE (Still needed for IE11).

### Fixed
 - Better event handling.
 - Only hide the currently visible context menu. On touch screens, the menu closes before the event to click is triggered. This only happened when using multiple contex menus.

## v0.2.1

### Fixed
- Fixed `hideMenu is not a function` error while scrolling.

## v0.2.0

### Added
- Added `monitor` component to get currentItem and position.
- Added `.npmignore`.

### Changed
- Replaced `lodash.merge` with `object-assign`.
- Now children are not cloned inside `ContextMenu` component.
- Updated dev dependencies.

## v0.1.0

- Initial Release
