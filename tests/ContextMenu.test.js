import React from 'react';
import { mount } from 'enzyme';

import ContextMenu from '../src/ContextMenu';
import { showMenu, hideMenu } from '../src/actions';

describe('ContextMenu tests', () => {
    test('shows when event with correct "id" is triggered', () => {
        const ID = 'CORRECT_ID';
        const x = 50;
        const y = 50;
        const component = mount(
            <ContextMenu id={ID} />
        );

        expect(component).toMatchSnapshot();
        expect(component.state()).toEqual({isVisible: false, x: 0, y: 0});
        showMenu({position: {x, y}, id: ID});
        expect(component.state()).toEqual({isVisible: true, x, y});
        expect(component).toMatchSnapshot();
        component.unmount();
    });

    test('does not shows when event with incorrect "id" is triggered', () => {
        const ID = 'CORRECT_ID';
        const x = 50;
        const y = 50;
        const component = mount(
            <ContextMenu id={ID} />
        );

        expect(component).toMatchSnapshot();
        expect(component.state()).toEqual({isVisible: false, x: 0, y: 0});
        showMenu({position: {x, y}, id: 'ID'});
        expect(component.state()).toEqual({isVisible: false, x: 0, y: 0});
        expect(component).toMatchSnapshot();
        component.unmount();
    });

    test('onShow and onHide are triggered correctly', () => {
        const data = {position: {x: 50, y: 50}, id: 'CORRECT_ID'};
        const onShow = jest.fn();
        const onHide = jest.fn();
        const component = mount(
            <ContextMenu id={data.id} onShow={onShow} onHide={onHide} />
        );

        hideMenu();
        showMenu(data);
        expect(component.state()).toEqual(Object.assign({isVisible: true}, data.position));
        expect(onShow).toHaveBeenCalled();
        showMenu(data);
        expect(onShow).toHaveBeenCalledTimes(1);
        expect(onHide).not.toHaveBeenCalled();
        hideMenu();
        expect(component.state()).toEqual(Object.assign({isVisible: false}, data.position));
        expect(onShow).toHaveBeenCalledTimes(1);
        expect(onHide).toHaveBeenCalledTimes(1);
        component.unmount();
    });

    test('menu should close on "Escape"', () => {
        const data = {position: {x: 50, y: 50}, id: 'CORRECT_ID'};
        const component = mount(
            <ContextMenu id={data.id} />
        );
        const escape = new window.KeyboardEvent('keyup', {keyCode: 27});

        showMenu(data);
        expect(component.state()).toEqual(Object.assign({isVisible: true}, data.position));
        document.dispatchEvent(escape);
        expect(component.state()).toEqual(Object.assign({isVisible: false}, data.position));
        component.unmount();
    });

    test('menu should close on "outside" click', () => {
        const data = {position: {x: 50, y: 50}, id: 'CORRECT_ID'};
        const component = mount(
            <ContextMenu id={data.id} />
        );
        const outsideClick = new window.MouseEvent('mousedown', {target: document});

        showMenu(data);
        expect(component.state()).toEqual(Object.assign({isVisible: true}, data.position));
        component.simulate('mousedown');
        expect(component.state()).toEqual(Object.assign({isVisible: true}, data.position));
        document.dispatchEvent(outsideClick);
        expect(component.state()).toEqual(Object.assign({isVisible: false}, data.position));
        component.unmount();
    });

    test('hideOnLeave and onMouseLeave options', () => {
        const data = {position: {x: 50, y: 50}, id: 'CORRECT_ID'};
        const onMouseLeave = jest.fn();
        const component = mount(
            <ContextMenu id={data.id} hideOnLeave onMouseLeave={onMouseLeave} />
        );

        showMenu(data);
        expect(component.state()).toEqual(Object.assign({isVisible: true}, data.position));
        component.simulate('mouseleave');
        expect(component.state()).toEqual(Object.assign({isVisible: false}, data.position));
        expect(onMouseLeave).toHaveBeenCalled();
        component.unmount();
    });
});
