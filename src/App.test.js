import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { OPTIONS } from "./test-assets/Select"
import Search from './components/common/Select'


class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'foo' };
  }

  render() {
    const { name } = this.state;
    return (
      <div className={name} />
    );
  }
}


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

  test("All Options should render in option panel", () => {
  	const wrapper = shallow(<Search options={OPTIONS} />)
  	wrapper.setState({ isOptionPanelOpen: true })
  	expect(wrapper.find('.options-panel-item').length).toBe(OPTIONS.length);
  })

  test("Option panel should open when isOptionPanelOpen state is true", () => {
  	const wrapper = shallow(<Search options={[]} />)
  	wrapper.setState({ isOptionPanelOpen: true })
  	expect(wrapper.find('div.option-panel-msg').length).toBe(1);
  })

  test("Option panel should not open when isOptionPanelOpen state is false", () => {
  	const wrapper = shallow(<Search options={[]} />)
  	wrapper.setState({ isOptionPanelOpen: false })
  	expect(wrapper.find('div.option-panel-msg').length).toBe(0);
  })

  test("Filtered Options should not render in option panel, they should render as selection pill instead.", () => {
  	const wrapper = shallow(<Search options={OPTIONS} />)
  	const selections = [{...OPTIONS[0], isSelected: true }]
  	wrapper.setState({ isOptionPanelOpen: true , selections })

  	expect(wrapper.find('.options-panel-item').length).toBe(OPTIONS.length - selections.length);
  	expect(wrapper.find('.selected-item').length).toBe(selections.length);
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
	
  test("On clicking X in a selection, it should get removed", () => {
  	const wrapper = shallow(<Search {...selectProps} />)
  	const selections = [{...OPTIONS[0], isSelected: true }]
  	wrapper.setState({ isOptionPanelOpen: true , selections })
		expect(wrapper.find('.selected-item').length).toBe(selections.length);
  	
  	wrapper.find(".remove-selected-option").simulate("click")
  	
  	expect(wrapper.find('.selected-item').length).toBe(selections.length - 1);
  })
	

  test("Clear all Text should render when there are atleast one selection", () => {
  	const wrapper = shallow(<Search options={OPTIONS} />)
  	const selections = [{...OPTIONS[0], isSelected: true }]
  	wrapper.setState({ isOptionPanelOpen: true , selections })
  	expect(wrapper.find('.clear-all').length).toBe(1);
  })

  test("Clear all Text should NOT render when there are no selections", () => {
  	const wrapper = shallow(<Search options={OPTIONS} />)
  	wrapper.setState({ isOptionPanelOpen: true })
  	// no selections
  	expect(wrapper.find('.clear-all').length).toBe(0);
  })

});

