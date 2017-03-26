import React, { Component } from 'react';

import ContextMenuTrigger from 'src/ContextMenuTrigger';
import ContextMenu from 'src/ContextMenu';
import MenuItem from 'src/MenuItem';

const MENU_1 = 'MENU_1';
const MENU_2 = 'MENU_2';

export default class MultipleMenus extends Component {
    constructor(props) {
        super(props);

        this.state = { logs: [] };
    }

    handleClick = (e, data) => {
        this.setState(({ logs }) => ({
            logs: [`Clicked on menu ${data.menu} item ${data.item}`, ...logs]
        }));
    }

    render() {
        return (
            <div>
                <h3>Multiple Menus</h3>
                <p>This demo shows usage of multiple menus on multiple targets.</p>
                <div className='pure-g'>
                    <div className='pure-u-1-2'>
                        <ContextMenuTrigger id={MENU_1} holdToDisplay={1000}>
                            <div className='well'>right click to see the menu</div>
                        </ContextMenuTrigger>
                    </div>
                    <div className='pure-u-1-2'>
                        <ContextMenuTrigger id={MENU_2} holdToDisplay={1000}>
                            <div className='well'>right click to see the menu</div>
                        </ContextMenuTrigger>
                    </div>
                </div>
                <div>
                    {this.state.logs.map((log, i) => <p key={i}>{log}</p>)}
                </div>
                <ContextMenu id={MENU_1}>
                    <MenuItem onClick={this.handleClick} data={{ menu: 1, item: 1 }}>Menu 1 Item 1</MenuItem>
                    <MenuItem onClick={this.handleClick} data={{ menu: 1, item: 2 }}>Menu 1 Item 2</MenuItem>
                </ContextMenu>
                <ContextMenu id={MENU_2}>
                    <MenuItem onClick={this.handleClick} data={{ menu: 2, item: 1 }}>Menu 2 Item 1</MenuItem>
                    <MenuItem onClick={this.handleClick} data={{ menu: 2, item: 2 }}>Menu 2 Item 2</MenuItem>
                </ContextMenu>
            </div>
        );
    }
}
