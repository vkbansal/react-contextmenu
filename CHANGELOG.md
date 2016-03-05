# Changelog

All the changes can be found below. Order used:

- Added
- Changed
- Deprecated
- Removed
- Fixed
- Security

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
