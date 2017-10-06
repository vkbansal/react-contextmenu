"use strict";

import React from "react";
import { shallow, mount } from "enzyme";
import { expect } from "chai";

import SubMenu from "../src/submenu";

describe("<SubMenu/>", () => {
    it("should have `react-context-menu-item` & `submenu` classes", () => {
        const wrapper = shallow(<SubMenu title="foo"/>);

        expect(wrapper).to.have.className("react-context-menu-item");
        expect(wrapper).to.have.className("submenu");
    });

    it("<a/> should have `react-context-menu-link` class", () => {
        const wrapper = shallow(<SubMenu title="foo"/>);

        expect(wrapper.find("a")).to.have.className("react-context-menu-link");
        expect(wrapper.find("a")).to.not.have.className("disabled");
    });

    it("<a/> should have `disabled` class when disabled", () => {
        const wrapper = shallow(<SubMenu title="foo" disabled/>);

        expect(wrapper.find("a")).to.have.className("react-context-menu-link");
        expect(wrapper.find("a")).to.have.className("disabled");
    });

    it("should render `title` inside `<a/>`", () => {
        const title = Math.random().toString(36),
            wrapper = shallow(<SubMenu title={title} disabled/>);

        expect(wrapper.find("a")).to.have.text(title);
    });

    xit("should open submenu `onMouseEnter`", function() {
        const wrapper = mount(<SubMenu title="foo" hoverDelay={0}/>);

        wrapper.find(".submenu").simulate("mouseEnter");
        expect(wrapper).to.have.state("visible", true);
    });

    xit("should not open submenu `onMouseEnter` when disabled", function() {
        const wrapper = mount(<SubMenu title="foo" hoverDelay={0} disabled/>);

        wrapper.simulate("mouseenter");
        expect(wrapper).to.have.state("visible", false);
    });
});
