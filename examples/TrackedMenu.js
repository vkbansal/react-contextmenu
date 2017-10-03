import React, { Component } from 'react';

import ContextMenuTrigger from 'src/ContextMenuTrigger';
import ContextMenu from 'src/ContextMenu';
import SubMenu from 'src/SubMenu';
import MenuItem from 'src/MenuItem';

const MENU_TYPE = 'SIMPLE';

export default class SimpleMenu extends Component {
    constructor(props) {
        super(props);

        this.state = { logs: [] };
    }

    handleClick = (e, data) => {
        this.setState(({ logs }) => ({
            logs: [`Clicked on menu ${data.item}`, ...logs]
        }));
    }

    render() {
        return (
            <div>
                <h3>Simple Menu</h3>
                <p>This demo simple usage of a context menu.</p>
                <ContextMenuTrigger id={MENU_TYPE} holdToDisplay={1000}>
                    <div className='well'>right click to see the menu</div>
                </ContextMenuTrigger>
                <div>
                    {this.state.logs.map((log, i) => <p key={i}>{log}</p>)}
                </div>
                <ContextMenu id={MENU_TYPE}>
                    <MenuItem track defaultSelection onClick={this.handleClick} data={{ item: 'item 1' }}>Menu Item 1</MenuItem>
                    <MenuItem track onClick={this.handleClick} data={{ item: 'item 2' }}>Menu Item 2</MenuItem>
                    <SubMenu title='First Sub Menu'>
                        <MenuItem track defaultSelection onClick={this.handleClick} data={{ item: 'subsubitem 1' }}>SubSubItem 1</MenuItem>
                        <MenuItem track onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 2</MenuItem>
                    </SubMenu>
                    <SubMenu title='Second Sub Menu'>
                        <MenuItem track onClick={this.handleClick} data={{ item: 'subsubitem 3' }}>SubSubItem 3</MenuItem>
                        <MenuItem track onClick={this.handleClick} data={{ item: 'subsubitem 4' }}>SubSubItem 4</MenuItem>
                    </SubMenu>
                </ContextMenu>
            </div>
        );
    }
}
