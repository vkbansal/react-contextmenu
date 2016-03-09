"use strict";

import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import { expect } from "chai";

import MenuItem from "../src/menu-item";

describe("<MenuItem/>", () => {
    it("should have `react-context-menu-item` class", () => {
        const wrapper = shallow(<MenuItem onClick={() => ({})}/>);

        expect(wrapper.hasClass("react-context-menu-item")).to.equal(true);
    });

    it("<a/> should have `react-context-menu-link` class", () => {
        const wrapper = shallow(<MenuItem onClick={() => ({})}/>);

        expect(wrapper.find("a").hasClass("react-context-menu-link")).to.equal(true);
    });

    it("<a/> should have `disabled` class when disabled", () => {
        const wrapper = shallow(<MenuItem onClick={() => ({})} disabled/>);

        expect(wrapper.find("a").hasClass("disabled")).to.equal(true);
    });

    it("click should be triggered", () => {
        const onClick = sinon.spy(),
            wrapper = mount(<MenuItem onClick={onClick}/>);

        wrapper.find("a").simulate("click");
        expect(onClick.called).to.equal(true);
        expect(onClick.callCount).to.equal(1);
    });

    it("click should not be triggered when disabled", () => {
        const onClick = sinon.spy(),
            wrapper = mount(<MenuItem onClick={onClick} disabled/>);

        wrapper.find("a").simulate("click");
        expect(onClick.called).to.equal(false);
        expect(onClick.callCount).to.equal(0);
    });

    it("given data should be passed to click callback", () => {
        const onClick = sinon.spy(),
            data = {
                foo: Math.random().toString(36),
                bar: Math.random().toString(36)
            },
            wrapper = mount(<MenuItem onClick={onClick} data={data}/>);

        wrapper.find("a").simulate("click");
        expect(onClick.getCall(0).args[1]).to.equal(data);
    });
});
