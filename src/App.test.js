import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import App from './App';
import Search from './components/common/Select'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

const options = [
  {
    "label": "Hong Kil-dong",
    "value": "tt0254387",
    "year": "1986"
  },
  {
    "label": "Kil",
    "value": "tt3045760",
    "year": "2013"
  },
  {
    "label": "Gyeongmajang ganeun kil",
    "value": "tt0104655",
    "year": "1991"
  },
  {
    "label": "Sampoganeun kil",
    "value": "tt0307406",
    "year": "1975"
  },
  {
    "label": "Mixed-Up Hong Kil-dong",
    "value": "tt0381723",
    "year": "1990"
  },
  {
    "label": "Hong Kil-dong",
    "value": "tt0327306",
    "year": "1967"
  }
]

describe('Search Component', () => {
  test("Search component renders with no search results", () => {
  	const wrapper = shallow(<Search options={[]} />)
  	expect(wrapper.exists()).toBe(true)
  })

  test("Search component renders with search results", () => {
  	const wrapper = shallow(<Search options={options} />)
  	expect(wrapper).toMatchSnapshot();
  })

  test("Search component search text is echoed", () => {
  	const wrapper = shallow(<Search options={[]} isSearchable={true} handleInputChange={()=>{}}/>)
  	wrapper.find("input").simulate("change", {
  		target: { value: "Fast" }
  	})
  	expect(wrapper.find("input").props().value).toEqual("Fast")
  })

  
  test("Search component search text is echoed", () => {
  	const wrapper = shallow(<Search options={[]} isSearchable={true} handleInputChange={()=>{}}/>)
  	wrapper.find("input").simulate("change", {
  		target: { value: "Fast" }
  	})
  	expect(wrapper.find("input").props().value).toEqual("Fast")
  })

});

