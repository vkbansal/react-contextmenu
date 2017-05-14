import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';

export default class AbstractMenu extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    constructor(props) {
        super(props);

        this.seletedItemRef = null;
        this.state = {
            selectedItem: null,
            forceSubMenuOpen: false
        };
    }

    handleKeyNavigation = (e) => {
        switch (e.keyCode) {
            case 37: // left arrow
            case 27: // escape
                e.preventDefault();
                this.hideMenu(e);
                break;
            case 38: // up arrow
                e.preventDefault();
                this.selectChildren(true);
                break;
            case 40: // down arrow
                e.preventDefault();
                this.selectChildren(false);
                break;
            case 39: // right arrow
                this.tryToOpenSubMenu(e);
                break;
            case 13: // enter
                e.preventDefault();
                this.tryToOpenSubMenu(e);
                if (this.seletedItemRef && this.seletedItemRef.ref) this.seletedItemRef.ref.click();
                break;
            default:
                // do nothing
        }
    }

    handleForceClose = () => {
        this.setState({ forceSubMenuOpen: false });
    }

    tryToOpenSubMenu = (e) => {
        if (this.state.selectedItem && this.state.selectedItem.type === this.getSubMenuType()) {
            e.preventDefault();
            this.setState({ forceSubMenuOpen: true });
        }
    }

    selectChildren = (forward) => {
        const { selectedItem } = this.state;
        const children = [];
        React.Children.forEach(this.props.children, (child) => {
            if ([MenuItem, this.getSubMenuType()].indexOf(child.type) > -1 && !child.props.divider) {
                children.push(child);
            }
        });
        const currentIndex = children.indexOf(selectedItem);
        if (currentIndex < 0) {
            this.setState({
                selectedItem: forward ? children[children.length - 1] : children[0],
                forceSubMenuOpen: false
            });
        } else if (forward) {
            this.setState({
                selectedItem: children[currentIndex - 1 < 0 ? children.length - 1 : currentIndex - 1],
                forceSubMenuOpen: false
            });
        } else {
            this.setState({
                selectedItem: children[currentIndex + 1 < children.length ? currentIndex + 1 : 0],
                forceSubMenuOpen: false
            });
        }
    }

    onChildMouseMove = (child) => {
        if (this.state.selectedItem !== child) {
            this.setState({ selectedItem: child, forceSubMenuOpen: false });
        }
    }

    onChildMouseLeave = () => {
        this.setState({ selectedItem: null, forceSubMenuOpen: false });
    }

    renderChildren = children => React.Children.map(children, (child) => {
        const props = {};
        if (child.type === this.getSubMenuType()) {
            props.forceOpen = this.state.forceSubMenuOpen && (this.state.selectedItem === child);
            props.forceClose = this.handleForceClose;
            props.parentKeyNavigationHandler = this.handleKeyNavigation;
        }
        if ([MenuItem, this.getSubMenuType()].indexOf(child.type) > -1 && !child.props.divider) {
            if (this.state.selectedItem === child) {
                props.selected = true;
                props.onMouseLeave = this.onChildMouseLeave.bind(this);
                props.ref = (ref) => { this.seletedItemRef = ref; };
                return React.cloneElement(child, props);
            }
        }
        props.onMouseMove = () => this.onChildMouseMove(child);
        props.onMouseLeave = this.onChildMouseLeave.bind(this);
        return React.cloneElement(child, props);
    });
}
