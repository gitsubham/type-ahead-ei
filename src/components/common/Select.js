import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { default as ReactSelect, components } from 'react-select'


export default class Select extends Component {

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
      placeholder, noOptionsMessage } = this.props
    const selectProps = {
      cacheOptions,
      ...(customOptionsCreator
        && { components: this.formCustomComponents({ customOptionsCreator }) }), 
      ...(customStyles && { styles: customStyles }),
      isMulti,
      isLoading,
      options,
      onInputChange: this.handleInputChange,
      placeholder,
      noOptionsMessage
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