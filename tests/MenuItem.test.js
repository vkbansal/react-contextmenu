import React from 'react';
import { shallow } from 'enzyme';

import MenuItem from '../src/MenuItem';

describe('MenuItem tests', () => {
    test('extends className correctly', () => {
        const className = 'CLASSNAME_PROP';
        const attributes = {
            className: 'CLASSNAME_ATTRIBUTE'
        };

        const wrapper = shallow(
            <MenuItem className={className} attributes={attributes} />
        );

        expect(wrapper.hasClass(className)).toBe(true);
        expect(wrapper.hasClass(attributes.className)).toBe(true);
    });
});
