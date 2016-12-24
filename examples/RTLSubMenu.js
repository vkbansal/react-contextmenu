import React, { Component } from 'react';

import ContextMenuTrigger from 'src/ContextMenuTrigger';
import ContextMenu from 'src/ContextMenu';
import MenuItem from 'src/MenuItem';
import SubMenu from 'src/SubMenu';

const MENU_TYPE = 'RTL';

export default class RTLSubMenu extends Component {
    constructor(props) {
        super(props);

        this.state = { logs: [] };
    }

    handleClick = (e, data) => {
        this.setState(({logs}) => ({
            logs: [`Clicked on menu ${data.item}`, ...logs]
        }));
    }

    render() {
        return (
            <div>
                <h3>Right-to-Left Submenu Menu</h3>
                <p>This demos usage of Right-to-Left submenus.</p>
                <ContextMenuTrigger id={MENU_TYPE} holdToDisplay={1000}>
                    <div className='well'>right click to see the menu</div>
                </ContextMenuTrigger>
                <div>
                    {this.state.logs.map((log, i) => (<p key={i}>{log}</p>))}
                </div>
                <ContextMenu id={MENU_TYPE}>
                    <MenuItem onClick={this.handleClick} data={{item: 'item 1'}}>Menu Item 1</MenuItem>
                    <MenuItem onClick={this.handleClick} data={{item: 'item 2'}}>Menu Item 2</MenuItem>
                    <SubMenu title='A SubMenu' rtl>
                        <MenuItem onClick={this.handleClick} data={{item: 'subitem 1'}}>SubItem 1</MenuItem>
                        <SubMenu title='Another SubMenu' rtl>
                            <MenuItem onClick={this.handleClick} data={{item: 'subsubitem 1'}}>SubSubItem 1</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{item: 'subsubitem 2'}}>SubSubItem 2</MenuItem>
                        </SubMenu>
                        <SubMenu title='Yet Another SubMenu' rtl>
                            <MenuItem onClick={this.handleClick} data={{item: 'subsubitem 3'}}>SubSubItem 3</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{item: 'subsubitem 4'}}>SubSubItem 4</MenuItem>
                        </SubMenu>
                        <MenuItem onClick={this.handleClick} data={{item: 'subitem 2'}}>SubItem 2</MenuItem>
                    </SubMenu>
                </ContextMenu>
            </div>
        );
    }
}
