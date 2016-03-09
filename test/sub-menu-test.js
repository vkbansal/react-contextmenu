"use strict";

import React from "react";
import { shallow, mount } from "enzyme";
// import sinon from "sinon";
import { expect } from "chai";

import SubMenu from "../src/submenu";
// import monitor from "../src/monitor";

describe("<SubMenu/>", () => {
    it("should have `react-context-menu-item` & `submenu` classes", () => {
        const wrapper = shallow(<SubMenu title="foo"/>);

        expect(wrapper.hasClass("react-context-menu-item")).to.equal(true);
        expect(wrapper.hasClass("submenu")).to.equal(true);
    });

    it("<a/> should have `react-context-menu-link` class", () => {
        const wrapper = shallow(<SubMenu title="foo"/>);

        expect(wrapper.find("a").hasClass("react-context-menu-link")).to.equal(true);
    });

    it("<a/> should have `disabled` class when disabled", () => {
        const wrapper = shallow(<SubMenu title="foo" disabled/>);

        expect(wrapper.find("a").hasClass("disabled")).to.equal(true);
    });

    it("should render `title` inside `<a/>`", () => {
        const title = Math.random().toString(36),
            wrapper = shallow(<SubMenu title={title} disabled/>);

        expect(wrapper.find("a").text()).to.equal(title);
    });

    xit("should open submenu `onMouseEnter`", function() {
        const wrapper = mount(<SubMenu title="foo" hoverDelay={0}/>);

        wrapper.simulate("mouseenter");
        expect(wrapper.state("visible")).to.equal(true);
    });

    xit("should not open submenu `onMouseEnter` when disabled", function() {
        const wrapper = mount(<SubMenu title="foo" hoverDelay={0} disabled/>);

        wrapper.simulate("mouseenter");
        expect(wrapper.state("visible")).to.equal(false);
    });
});
