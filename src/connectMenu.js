import React from 'react';

import ContextMenuTrigger from './ContextMenuTrigger';
import listener from './globalEventListener';

// collect ContextMenuTrigger's expected props to NOT pass them on as part of the context
const excludedProps = [...Object.keys(ContextMenuTrigger.propTypes), 'children'];

// expect the id of the menu to be responsible for as outer parameter
export default function (menuId) {
    // expect menu component to connect as inner parameter
    // <Child/> is presumably a wrapper of <ContextMenu/>
    return function (Child) {
        // return wrapper for <Child/> that forwards the ContextMenuTrigger's additional props
        return class ConnectMenu extends React.Component {
            constructor(props) {
                super(props);
                this.state = { context: null };
                this.handleShow = this.handleShow.bind(this);
                this.handleHide = this.handleHide.bind(this);
            }

            componentDidMount() {
                this.listenId = listener.register(this.handleShow, this.handleHide);
            }

            componentWillUnmount() {
                if (this.listenId) listener.unregister(this.listenId);
            }

            handleShow(e) {
                if (e.detail.id === menuId) {
                    // the onShow event's detail.data object holds all ContextMenuTrigger props
                    const { data } = e.detail;
                    const filteredData = {};

                    for (const key in data) {
                        // exclude props the ContextMenuTrigger is expecting itself
                        if (!excludedProps.includes(key)) filteredData[key] = data[key];
                    }
                    this.setState({ context: filteredData });
                }
            }

            handleHide() {
                this.setState({ context: null });
            }

            render() {
                return <Child {...this.props} context={this.state.context} />;
            }
        };
    };
}
