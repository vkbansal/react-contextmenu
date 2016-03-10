"use strict";

import React from "react";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import { expect } from "chai";

import MenuItem from "../src/menu-item";
import monitor from "../src/monitor";

describe("<MenuItem/>", () => {
    it("should have `react-context-menu-item` class", () => {
        const wrapper = shallow(<MenuItem onClick={() => ({})}/>);

        expect(wrapper).to.have.className("react-context-menu-item");
    });

    it("<a/> should have `react-context-menu-link` class", () => {
        const wrapper = shallow(<MenuItem onClick={() => ({})}/>);

        expect(wrapper.find("a")).to.have.className("react-context-menu-link");
        expect(wrapper.find("a")).to.not.have.className("disabled");
    });

    it("<a/> should have `disabled` class when disabled", () => {
        const wrapper = shallow(<MenuItem onClick={() => ({})} disabled/>);

        expect(wrapper.find("a")).to.have.className("react-context-menu-link");
        expect(wrapper.find("a")).to.have.className("disabled");
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

    it("`preventClose` should not close the menu", () => {
        const spy = sinon.spy(monitor, "hideMenu"),
            wrapper = mount(<MenuItem onClick={() => ({})} preventClose/>);

        wrapper.find("a").simulate("click");
        expect(spy.called).to.equal(false);
        expect(spy.callCount).to.equal(0);
        monitor.hideMenu.restore();
    });
});
