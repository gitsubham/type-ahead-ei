import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Async from 'react-select/async';
import { default as ReactSelect } from 'react-select'

export default class Select extends Component {

  constructor(props) {
    super(props)
    this.state = { selectedValue : '' }
  }

  renderSyncSelect = () => {
    const { options, isMulti, isLoading, cacheOptions } = this.props
    
    const syncProps = {
      cacheOptions,
      isMulti,
      isLoading,
      options,
      onInputChange: this.handleInputChange,
      // value: this.state.selectedValue,
      // key:JSON.stringify(options)
    }
    
    return (<ReactSelect {...syncProps} />)
  }

  handleInputChange = newVal => {
    console.log('handleInputChange')
    this.setState({ selectedValue : newVal })
    if (newVal != '') {
      this.props.handleInputChange(newVal)
    }
  }

  loadOptions = async (inputVal, callback) => {
    console.log('loadOptions')
  }
  
  renderAsyncSelect = () => {
    const { options, isAsync, isMulti } = this.props

    const asyncProps = {
      isMulti,
      loadOptions: this.loadOptions,
      onInputChange: this.handleInputChange
    }
    return (<Async {...asyncProps} />)
  }

  render() { 
    console.log("redered TypeAhead", this.props)
    const { isAsync } = this.props
    if (!isAsync) {
      return this.renderSyncSelect()
    }
    return this.renderAsyncSelect()     
  }
}

Select.propTypes = {
  handleInputChange: PropTypes.func,
  isAsync: PropTypes.bool,
  isMulti: PropTypes.bool,
  options: PropTypes.array,
}