import React, { Component } from 'react';

import ContextMenuTrigger from 'src/ContextMenuTrigger';
import ContextMenu from 'src/ContextMenu';
import MenuItem from 'src/MenuItem';

const MENU_TYPE = 'SIMPLE22';
const MENU_TYPE2 = 'SIMPLE222';

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
                <h3>Test Menu</h3>
                <p>This demo simple usage of a context menu.</p>
                <ContextMenuTrigger id={MENU_TYPE} holdToDisplay={1000}>
                    <div className='well'>
                        <span>right click to see the menu</span>
                        <ContextMenuTrigger id={MENU_TYPE2} holdToDisplay={1000}>
                            <div className='well' style={{ border: '1px solid white' }}>
                                right click to see the nested menu
                            </div>
                        </ContextMenuTrigger>
                    </div>
                </ContextMenuTrigger>
                <div>
                    {this.state.logs.map((log, i) => <p key={i}>{log}</p>)}
                </div>
                <ContextMenu id={MENU_TYPE}>
                    <MenuItem onClick={this.handleClick} data={{ item: 'item 1' }}>Menu Item 1</MenuItem>
                    <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>Menu Item 2</MenuItem>
                    <MenuItem divider />
                    <MenuItem onClick={this.handleClick} data={{ item: 'item 3' }}>Menu Item 3</MenuItem>
                </ContextMenu>
                <ContextMenu id={MENU_TYPE2}>
                    <MenuItem onClick={this.handleClick} data={{ item: 'nested item 1' }}>Nested Menu Item 1</MenuItem>
                    <MenuItem onClick={this.handleClick} data={{ item: 'nested item 2' }}>Nested Menu Item 2</MenuItem>
                    <MenuItem divider />
                    <MenuItem onClick={this.handleClick} data={{ item: 'nested item 3' }}>Nested Menu Item 3</MenuItem>
                </ContextMenu>
            </div>
        );
    }
}
