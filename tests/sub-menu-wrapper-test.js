"use strict";

import React from "react";
import { shallow, mount } from "enzyme";
// import sinon from "sinon";
import { expect } from "chai";

import SubMenuWrapper from "../src/submenu/wrapper";
// import monitor from "../src/monitor";

describe("<SubMenuWrapper/>", () => {
    it("should have `react-context-menu` class", () => {
        const wrapper = shallow(<SubMenuWrapper/>);

        expect(wrapper.hasClass("react-context-menu")).to.equal(true);
    });

    it("should be invisible by default", () => {
        const wrapper = mount(<SubMenuWrapper/>);

        expect(wrapper.find("nav")).to.have.style("display", "none");
    });

    it("should be visible when `visible` is passed", () => {
        const wrapper = mount(<SubMenuWrapper visible/>);

        expect(wrapper.find("nav")).to.have.style("display", "block");
    });
});
