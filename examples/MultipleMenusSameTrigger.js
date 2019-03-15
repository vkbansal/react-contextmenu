import React, { Component } from 'react';

import ContextMenuTrigger from 'src/ContextMenuTrigger';
import ContextMenu from 'src/ContextMenu';
import MenuItem from 'src/MenuItem';

export default class MultipleMenusSameTrigger extends Component {
  constructor(props) {
    super(props)
    this.state = {count: 0}
  }

  handleClick = (e, data) => {
    console.log(data.foo);
  }

  handleDivClick = () => {
    this.setState((state) => ({count: state.count + 1}))
  }

  render() {
      return (
          <div>
              <ContextMenuTrigger id={() => this.state.count % 2 === 0 ? 'menu1' : 'menu2'}>
                  <div className="well" onClick={this.handleDivClick}>
                      Click for count, right click for menu count even {this.state.count % 2 === 0 ? 'true' : 'false'}
                  </div>
              </ContextMenuTrigger>

              <ContextMenu id="menu1">
                  <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                      ContextMenu Item 1
                  </MenuItem>
                  <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                      ContextMenu Item 2
                  </MenuItem>
              </ContextMenu>

              <ContextMenu id="menu2">
                  <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                      ContextMenu Item 3
                  </MenuItem>
                  <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                      ContextMenu Item 4
                  </MenuItem>
              </ContextMenu>
          </div>
      );
  }

}
