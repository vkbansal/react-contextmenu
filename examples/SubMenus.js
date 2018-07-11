import React, { Component } from 'react';

import ContextMenuTrigger from 'src/ContextMenuTrigger';
import ContextMenu from 'src/ContextMenu';
import MenuItem from 'src/MenuItem';
import SubMenu from 'src/SubMenu';

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
                    <MenuItem onClick={this.handleClick} data={{ item: 'item 1' }}>Menu Item 1</MenuItem>
                    <MenuItem onClick={this.handleClick} data={{ item: 'item 2' }}>Menu Item 2</MenuItem>
                    <SubMenu title='A SubMenu'>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 1' }}>SubItem 1</MenuItem>
                        <SubMenu title='Another SubMenu' rtl='true'>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 1' }}>SubSubItem 1</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 2</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 3</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 4</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 5</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 6</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 7</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 8</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 9</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 10</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 11</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 12</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 13</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 14</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 15</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 16</MenuItem>
                        </SubMenu>
                        <SubMenu title='Yet Another SubMenu'>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 3' }}>SubSubItem 3</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 4' }}>SubSubItem 4</MenuItem>
                        </SubMenu>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 2' }}>SubItem 2</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 3' }}>SubItem 3</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 4' }}>SubItem 4</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 2' }}>SubItem 5</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 2' }}>SubItem 6</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 2' }}>SubItem 7</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 2' }}>SubItem 8</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 2' }}>SubItem 9</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 2' }}>SubItem 10</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 2' }}>SubItem 11</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 2' }}>SubItem 12</MenuItem>
                        <SubMenu title='Another SubMenu'>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 1' }}>SubSubItem 1</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 2</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 3</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 4</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 5</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 6</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 7</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 8</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 9</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 10</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 11</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 12</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 13</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 14</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 15</MenuItem>
                            <MenuItem onClick={this.handleClick} data={{ item: 'subsubitem 2' }}>SubSubItem 16</MenuItem>
                        </SubMenu>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 2' }}>SubItem 13</MenuItem>
                        <MenuItem onClick={this.handleClick} data={{ item: 'subitem 2' }}>SubItem 14</MenuItem>
                    </SubMenu>
                </ContextMenu>
            </div>
        );
    }
}
