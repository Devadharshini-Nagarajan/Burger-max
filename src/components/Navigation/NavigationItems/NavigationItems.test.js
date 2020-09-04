import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter})
describe('Navigation Items',() => {
    it("should navigate 2 url if not auth", () => {
        const wrapper = shallow(<NavigationItems />)
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
})