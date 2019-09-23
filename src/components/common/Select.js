import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { default as ReactSelect, components } from 'react-select'
import { get } from 'lodash'

export default class Select extends Component {

  constructor(props) {
    super(props)
    this.state = { selections: []}
  }

  formCustomComponents = ( { customOptionsCreator }) => {
    let customComponents = {}
    if (customOptionsCreator) {
      const Option = props => {
        return (
          <components.Option {...props}>
            {customOptionsCreator(props)}
          </components.Option>
        );
      };
      customComponents = { Option }
    }

    return customComponents
  }

  renderSelect = () => {
    const { options, isMulti, isLoading, cacheOptions, customOptionsCreator, customStyles,
      placeholder, noOptionsMessage, onChange, isSearchable } = this.props
    const selectProps = {
      cacheOptions,
      ...(customOptionsCreator
        && { components: this.formCustomComponents({ customOptionsCreator }) }), 
      ...(customStyles && { styles: customStyles }),
      isMulti,
      isLoading,
      isSearchable,
      options,
      ...(onChange && { onChange }),
      onInputChange: this.handleInputChange,
      placeholder,
      noOptionsMessage
    }
    
    return (<ReactSelect {...selectProps} />)
  }

  handleInputChange = e => {
    const newVal = get(e, 'target.value')
    if (newVal !== '') {
      this.props.handleInputChange(newVal)
    }
  }

  onOptionSelection = (option, action) => {
    if (action === "push-option") {
      this.setState(
        prevState => ({ selections: prevState.selections.push(selectedOption) }),
        this.props.onChange({option, selections: this.state.selections, action})
      )
    } else if (action === "pop-option") {
      // to be implemented
    }

    
  }

  renderCustomSelect = () => {
    const { options, isMulti, isLoading, cacheOptions, customOptionsCreator, customStyles,
      placeholder, noOptionsMessage, onChange, isSearchable } = this.props

    return (
      <div>
        <input 
          type="text"
          placeholder= "Search movies.."  
          onBlur={this.handleInputChange}
        />
        {options && options.map(option => (<div onClick={() => this.onOptionSelection(option)}> {option.label} </div>))}
      </div>
    )
  }
  
  render() { 
    return (<React.Fragment>
      {this.renderSelect()}
      {this.renderCustomSelect()}
    </React.Fragment>)  
  }
}

Select.propTypes = {
  cacheOptions: PropTypes.bool,
  customStyles: PropTypes.object,
  customOptionsCreator: PropTypes.func, 
  handleInputChange: PropTypes.func,
  isLoading: PropTypes.bool,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  noOptionsMessage: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string, 
}