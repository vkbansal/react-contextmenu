import React, { Component } from 'react';

import ContextMenuTrigger from 'src/ContextMenuTrigger';
import ContextMenu from 'src/ContextMenu';
import MenuItem from 'src/MenuItem';

function ThirdPartyComponent() { // disable-eslint-line react/no-multi-comp
    return (<div>
        <div className='well menu1'>
            Right click for context menu 1.
        </div>
        <div className='well menu2'>
            Right click for context menu 2.
        </div>
    </div>);
}

export default class MultipleMenusSameTrigger extends Component {
    static getMenuID(event) {
        return event.target.className.indexOf('menu1') !== -1 ? 'menu1' : 'menu2';
    }

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
                <p>This demo shows usage of multiple menus but same trigger.</p>
                <div className='pure-g'>
                    <div className='pure-u-1-2'>
                        <ContextMenuTrigger id={MultipleMenusSameTrigger.getMenuID}>
                            <ThirdPartyComponent />
                        </ContextMenuTrigger>
                        <div>
                            {this.state.logs.map((log, i) => <p key={i}>{log}</p>)}
                        </div>

                        <ContextMenu id='menu1'>
                            <MenuItem data={{ menu: 1, item: 1 }} onClick={this.handleClick}>
                                Menu 1 Item 1
                            </MenuItem>
                            <MenuItem data={{ menu: 1, item: 2 }} onClick={this.handleClick}>
                                Menu 1 Item 2
                            </MenuItem>
                        </ContextMenu>

                        <ContextMenu id='menu2'>
                            <MenuItem data={{ menu: 2, item: 1 }} onClick={this.handleClick}>
                                Menu 2 Item 1
                            </MenuItem>
                            <MenuItem data={{ menu: 2, item: 2 }} onClick={this.handleClick}>
                                Menu 2 Item 2
                            </MenuItem>
                        </ContextMenu>
                    </div>
                </div>
            </div>
        );
    }

}
