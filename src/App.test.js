import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { OPTIONS } from "./test-assets/Select"
import Search from './components/common/Select'


Enzyme.configure({ adapter: new Adapter() });

const selectProps = {
	options: OPTIONS,
	handleInputChange: () => {},
}

describe('Search Component', () => {
  test("Search component renders with no search results", () => {
  	const wrapper = shallow(<Search />)
  	expect(wrapper.exists()).toBe(true)
  })

  test("Search component renders with search results", () => {
  	const wrapper = shallow(<Search options={OPTIONS} />)
  	expect(wrapper).toMatchSnapshot();
  })

  test("Search component search text is echoed", () => {
  	const wrapper = shallow(<Search {...selectProps} />)
  	wrapper.find("input").simulate("change", {
  		target: { value: "Fast" }
  	})
  	expect(wrapper.find("input").props().value).toEqual("Fast")
  })

});

