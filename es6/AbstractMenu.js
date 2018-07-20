function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';

var AbstractMenu = function (_Component) {
    _inherits(AbstractMenu, _Component);

    function AbstractMenu(props) {
        _classCallCheck(this, AbstractMenu);

        var _this = _possibleConstructorReturn(this, (AbstractMenu.__proto__ || Object.getPrototypeOf(AbstractMenu)).call(this, props));

        _initialiseProps.call(_this);

        _this.seletedItemRef = null;
        _this.state = {
            selectedItem: null,
            forceSubMenuOpen: false
        };
        return _this;
    }

    return AbstractMenu;
}(Component);

AbstractMenu.propTypes = {
    children: PropTypes.node.isRequired
};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.handleKeyNavigation = function (e) {
        // check for isVisible strictly here as it might be undefined when this code executes in the context of SubMenu
        // but we only need to check when it runs in the ContextMenu context
        if (_this2.state.isVisible === false) {
            return;
        }

        switch (e.keyCode) {
            case 37: // left arrow
            case 27:
                // escape
                e.preventDefault();
                _this2.hideMenu(e);
                break;
            case 38:
                // up arrow
                e.preventDefault();
                _this2.selectChildren(true);
                break;
            case 40:
                // down arrow
                e.preventDefault();
                _this2.selectChildren(false);
                break;
            case 39:
                // right arrow
                _this2.tryToOpenSubMenu(e);
                break;
            case 13:
                // enter
                e.preventDefault();
                _this2.tryToOpenSubMenu(e);
                {
                    // determine the selected item is disabled or not
                    var disabled = _this2.seletedItemRef && _this2.seletedItemRef.props && _this2.seletedItemRef.props.disabled;

                    if (_this2.seletedItemRef && _this2.seletedItemRef.ref instanceof HTMLElement && !disabled) {
                        _this2.seletedItemRef.ref.click();
                    } else {
                        _this2.hideMenu(e);
                    }
                }
                break;
            default:
            // do nothing
        }
    };

    this.handleForceClose = function () {
        _this2.setState({ forceSubMenuOpen: false });
    };

    this.tryToOpenSubMenu = function (e) {
        if (_this2.state.selectedItem && _this2.state.selectedItem.type === _this2.getSubMenuType()) {
            e.preventDefault();
            _this2.setState({ forceSubMenuOpen: true });
        }
    };

    this.selectChildren = function (forward) {
        var selectedItem = _this2.state.selectedItem;

        var children = [];
        var childCollector = function childCollector(child) {
            // child can be empty in case you do conditional rendering of components, in which
            // case it should not be accounted for as a real child
            if (!child) {
                return;
            }

            if ([MenuItem, _this2.getSubMenuType()].indexOf(child.type) < 0) {
                // Maybe the MenuItem or SubMenu is capsuled in a wrapper div or something else
                React.Children.forEach(child.props.children, childCollector);
            } else if (!child.props.divider) {
                children.push(child);
            }
        };
        React.Children.forEach(_this2.props.children, childCollector);
        var currentIndex = children.indexOf(selectedItem);
        if (currentIndex < 0) {
            _this2.setState({
                selectedItem: forward ? children[children.length - 1] : children[0],
                forceSubMenuOpen: false
            });
        } else if (forward) {
            _this2.setState({
                selectedItem: children[currentIndex - 1 < 0 ? children.length - 1 : currentIndex - 1],
                forceSubMenuOpen: false
            });
        } else {
            _this2.setState({
                selectedItem: children[currentIndex + 1 < children.length ? currentIndex + 1 : 0],
                forceSubMenuOpen: false
            });
        }
    };

    this.onChildMouseMove = function (child) {
        if (_this2.state.selectedItem !== child) {
            _this2.setState({ selectedItem: child, forceSubMenuOpen: false });
        }
    };

    this.onChildMouseLeave = function () {
        _this2.setState({ selectedItem: null, forceSubMenuOpen: false });
    };

    this.renderChildren = function (children) {
        return React.Children.map(children, function (child) {
            var props = {};
            if (!React.isValidElement(child)) return child;
            if ([MenuItem, _this2.getSubMenuType()].indexOf(child.type) < 0) {
                // Maybe the MenuItem or SubMenu is capsuled in a wrapper div or something else
                props.children = _this2.renderChildren(child.props.children);
                return React.cloneElement(child, props);
            }
            props.onMouseLeave = _this2.onChildMouseLeave.bind(_this2);
            if (child.type === _this2.getSubMenuType()) {
                // special props for SubMenu only
                props.forceOpen = _this2.state.forceSubMenuOpen && _this2.state.selectedItem === child;
                props.forceClose = _this2.handleForceClose;
                props.parentKeyNavigationHandler = _this2.handleKeyNavigation;
            }
            if (!child.props.divider && _this2.state.selectedItem === child) {
                // special props for selected item only
                props.selected = true;
                props.ref = function (ref) {
                    _this2.seletedItemRef = ref;
                };
                return React.cloneElement(child, props);
            }
            // onMouseMove is only needed for non selected items
            props.onMouseMove = function () {
                return _this2.onChildMouseMove(child);
            };
            return React.cloneElement(child, props);
        });
    };
};

export default AbstractMenu;