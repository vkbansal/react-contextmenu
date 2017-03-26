import React, { Component } from 'react';

import ContextMenuTrigger from 'src/ContextMenuTrigger';
import ContextMenu from 'src/ContextMenu';
import MenuItem from 'src/MenuItem';

const MENU_TYPE = 'MULTI';

const targets = [{
    name: 'Banana'
}, {
    name: 'Apple'
}, {
    name: 'Papaya'
}, {
    name: 'Mango'
}, {
    name: 'Orange'
}, {
    name: 'Pineapple'
}];

function collect(props) {
    return { name: props.name };
}

export default class MultipleTargets extends Component {
    constructor(props) {
        super(props);

        this.state = { logs: [] };
    }

    handleClick = (e, data, target) => {
        const count = parseInt(target.getAttribute('data-count'), 10);

        if (data.action === 'Added') {
            target.setAttribute('data-count', count + 1);

            return this.setState(({ logs }) => ({
                logs: [`${data.action} 1 ${data.name}`, ...logs]
            }));
        }

        if (data.action === 'Removed' && count > 0) {
            target.setAttribute('data-count', count - 1);

            return this.setState(({ logs }) => ({
                logs: [`${data.action} 1 ${data.name}`, ...logs]
            }));
        }

        return this.setState(({ logs }) => ({
            logs: [` ${data.name} cannot be ${data.action.toLowerCase()}`, ...logs]
        }));
    }

    render() {
        const attributes = {
            'data-count': 0,
            className: 'example-multiple-targets well'
        };

        return (
            <div>
                <h3>Multiple Menus</h3>
                <p>This demo shows usage of multiple menus on multiple targets.</p>
                <div className='row'>
                    {targets.map((item, i) => (
                        <div key={i} className='col-sm-2 text-center'>
                            <ContextMenuTrigger
                                id={MENU_TYPE} name={item.name}
                                holdToDisplay={1000}
                                collect={collect} attributes={attributes}>
                                {item.name}
                            </ContextMenuTrigger>
                        </div>
                    ))}
                </div>
                <div>
                    {this.state.logs.map((log, i) => <p key={i}>{log}</p>)}
                </div>
                <ContextMenu id={MENU_TYPE}>
                    <MenuItem onClick={this.handleClick} data={{ action: 'Added' }}>Add 1 count</MenuItem>
                    <MenuItem onClick={this.handleClick} data={{ action: 'Removed' }}>Remove 1 count</MenuItem>
                </ContextMenu>
            </div>
        );
    }
}
