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

  handleInputChange = newVal => {
    if (newVal !== '') {
      this.props.handleInputChange(newVal)
    }
  }
  
  render() { 
    return this.renderSelect()
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