import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { default as ReactSelect, components } from 'react-select'


export default class Select extends Component {

  formCustomOption = customOptionsCreator => {
    const Option = props => {
      return (
        <components.Option {...props}>
          {customOptionsCreator(props)}
        </components.Option>
      );
    };
    return { Option }
  }

  renderSelect = () => {
    const { options, isMulti, isLoading, cacheOptions, customOptionsCreator } = this.props
    const selectProps = {
      cacheOptions,
      isMulti,
      isLoading,
      options,
      onInputChange: this.handleInputChange,
      ...(customOptionsCreator && { components: this.formCustomOption(customOptionsCreator)}), 
    }
    
    return (<ReactSelect {...selectProps} />)
  }

  handleInputChange = newVal => {
    if (newVal != '') {
      this.props.handleInputChange(newVal)
    }
  }
  
  render() { 
    return this.renderSelect()
  }
}

Select.propTypes = {
  cacheOptions: PropTypes.bool,
  handleInputChange: PropTypes.func,
  isLoading: PropTypes.bool,
  isMulti: PropTypes.bool,
  options: PropTypes.array,
}