import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, differenceWith, isEmpty } from 'lodash'
import { PUSH_OPTION, POP_OPTION, CLEAR_ALL_SELECTIONS, NO_OPTIONS_AVAILABLE, LOADING_MSG } from '../../constants'

export default class Select extends Component {

  constructor(props) {
    super(props)
    this.state = { selections: [], isOptionPanelOpen: false, token: '' }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ options: nextProps.options })
  }

  handleInputChange = e => {
    const newVal = get(e, 'target.value')
    this.setState({ isOptionPanelOpen : true, token: newVal })
    if (newVal !== '') {
      this.props.handleInputChange(newVal)
    }
  }

  getFilteredSelections = () => (this.state.selections.filter( selection => selection.isSelected ))

  onOptionSelection = (selectedOption, action) => {
    if (action === PUSH_OPTION) {
      this.setState(
        prevState => ({ selections: [...prevState.selections, { ...selectedOption, isSelected: true}] }),
        this.props.onChange({selectedOption, selections: this.getFilteredSelections(), action})
      )
    } else if (action === POP_OPTION) {
      const { selections } = this.state
      for (let i = 0; i < selections.length; i++) {
        if (selections[i].value === selectedOption.value) {
          const newSelection = Object.assign(selections[i])
          newSelection.isSelected = false
          selections[i] = newSelection
          this.setState(
            prevState => ({ selections }),
            this.props.onChange({selectedOption, selections: this.getFilteredSelections(), action})
          )
          break
        }
      }
    } else if (action === CLEAR_ALL_SELECTIONS) {
      this.setState(
        prevState => ({ selections: [], token: '' }),
        this.props.onChange({selectedOption, selections: this.getFilteredSelections(), action})
      )
    }
  }

  getFilteredOptions = (options, selections) => {
    return differenceWith(options, selections, 
      (option, selection) => ( (option.value === selection.value) && selection.isSelected) )
  }

  toggleOptionPanel = () => {
    this.setState(prevState => ({ isOptionPanelOpen: !prevState.isOptionPanelOpen }))
  }

  getNoOptionsMessage = () => {
    const { noOptionsMessage, isLoading } = this.props
    if (isLoading) {
      return LOADING_MSG
    }
    let message = NO_OPTIONS_AVAILABLE
    if (noOptionsMessage) {
      message = noOptionsMessage() || message
    }
    return  message
  }

  getOptions = () => {

  }

  renderOptions = filteredOptions => {
     const { customOptionsCreator } = this.props
    if (customOptionsCreator) {
      return filteredOptions.map(option => 
              (<div className="options-panel-item" onClick={() => this.onOptionSelection(option, PUSH_OPTION)}> {customOptionsCreator(option, this.props)} </div>))
    }
    return filteredOptions.map(option => 
              (<div className="options-panel-item" onClick={() => this.onOptionSelection(option, PUSH_OPTION)}> {option.label} </div>))
  
  }

  getPlaceHolderTxt = () => (this.props.placeholder || "Search..." )

  renderCustomSelect = () => {
    const { options, isSearchable } = this.props
    const { selections, isOptionPanelOpen } = this.state
    const filteredOptions = this.getFilteredOptions(options, selections)

    return (
      <div className="autocomplete-wrapper">
        {isOptionPanelOpen && <div onClick={this.toggleOptionPanel} className={"overlay"}> </div>}
        <div className="tags-wrapper">
        {selections && selections.map(selectedOption => {
          if (selectedOption.isSelected) {
            return (<span className="selected-item"> {selectedOption.label}
              <span className={"remove-selected-option"} onClick={() => this.onOptionSelection(selectedOption, POP_OPTION)}> X </span></span>)
          }
          return null
        })}
        </div>
        <div className="autocomplete-input-section">
          <div className={'input-control'}>
            {isSearchable && (<input
              type="text"
              placeholder={this.getPlaceHolderTxt()}
              onChange={this.handleInputChange}
              onClick={this.toggleOptionPanel}
              value={this.state.token}
            />)}
          </div>
          <span className={"f12 m12"} onClick={() => this.onOptionSelection(null, CLEAR_ALL_SELECTIONS)}> clear all </span>
          {isOptionPanelOpen && <div className={"options-panel"}>
            {isEmpty(filteredOptions) && <div className={"option-panel-msg"}> {this.getNoOptionsMessage()}</div>}
            {filteredOptions && this.renderOptions(filteredOptions)} 
          </div>}
        </div>
      </div>
    )
  }
  
  render() { 
    return (<React.Fragment>
      {this.renderCustomSelect()}
    </React.Fragment>)  
  }
}

Select.propTypes = {
  customOptionsCreator: PropTypes.func, 
  handleInputChange: PropTypes.func,
  isLoading: PropTypes.bool,
  isSearchable: PropTypes.bool,
  noOptionsMessage: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string, 
}