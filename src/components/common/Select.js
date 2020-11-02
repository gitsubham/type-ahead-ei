import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash'

import { NO_OPTIONS_AVAILABLE, LOADING_MSG } from '../../constants'
const CLEAR_SEARCH = 'CLEAR_SEARCH'

export default class Select extends Component {

  constructor(props) {
    super(props)
    this.state = { currSelection: {}, isOptionPanelOpen: false, token: '' }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }
 
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    if (event.keyCode === 38 || event.keyCode === 40) {
      const optionWrapper = document.getElementById('options-list')
      if (optionWrapper && optionWrapper.children) {
        const optionElems = optionWrapper.children, optionElemsArray = [];
        if (!this.focusedElement) {
          this.focusedElement = optionElems[0]
        }
        
        for (let i = 0;i< optionElems.length; i++) {
          optionElems[i].classList.remove('options-panel-item-hover')
          optionElemsArray[i] = optionElems[i];
        }
        
        const focusedIdx = optionElemsArray.findIndex(item => this.focusedElement.id === item.id);
        if (event.keyCode === 40) {
          this.handleKeyDown(focusedIdx, optionElemsArray);
        } else if (event.keyCode === 38) {
          this.handleKeyUp(focusedIdx, optionElemsArray);
        }
      }
    }

    if (event.keyCode === 13) {
      const { options } = this.props
      if (this.focusedElement) {
        const selection = options.filter(option => option.id === this.focusedElement.id)[0]
        this.onOptionSelection(selection)
      }
    }
  }

  handleInputChange = e => {
    const { options } = this.props

    const newVal = get(e, 'target.value')
    this.setState({ isOptionPanelOpen : true, token: newVal })
      this.focusedElement = null
      const filteredOptions = this.getFilteredOptions(options)
      for (let i=0; i < filteredOptions.length; i++) {
        const { label, address, value } = filteredOptions[i]
        if (label.search(newVal) > -1 || address.search(newVal) > -1 || value.search(newVal) > -1) {
          const elem = document.getElementById(filteredOptions[i].value)
          if (elem) {
            elem.scrollIntoView()
          }
          break
        }
      }
      
      
      this.props.handleInputChange(newVal)
  }


  onOptionSelection = (selectedOption, action) => {
    if (action === CLEAR_SEARCH) {
      this.setState({ currSelection: selectedOption, token: '', isOptionPanelOpen: false })
    } else {
      this.setState({ currSelection: selectedOption, token: selectedOption.label, isOptionPanelOpen: false })
    }
    
    this.props.onChange({ selectedOption })
  }

  getFilteredOptions = (options) => {
    const { token } = this.state

    return options.filter(option => {
      return (option.label.search(token) > -1)
              || (option.value.search(token) > - 1)
              || (option.address.search(token) > - 1)
    })
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

  getOptions = option => {
    const { customOptionsCreator } = this.props
    if (customOptionsCreator) {
      return customOptionsCreator(option, this.props)
    }  
    return option.label
  }

  renderOptions = filteredOptions => {
    const optionsHtml = filteredOptions.map(option => 
              (<div id={option.value} key={option.value} className="options-panel-item" onClick={() => this.onOptionSelection(option)}> {this.getOptions(option)} </div>))
      return (<div id={'options-list'}> {optionsHtml} </div>)
  }
  renderSearchTextBox = ()  => {
    const { isSearchable } = this.props
    const { token } = this.state

    return (<div className={'input-control'}>
            {isSearchable && (<input
              type="text"
              placeholder={this.getPlaceHolderTxt()}
              onChange={this.handleInputChange}
              onClick={this.toggleOptionPanel}
              value={token}
            />)}
          </div>)
  }

  renderOptionPanel = () => {
    const { options } = this.props
    const filteredOptions = this.getFilteredOptions(options)
    return (<div className={"options-panel"}>
            {isEmpty(filteredOptions) && <div className={"option-panel-msg"}> {this.getNoOptionsMessage()}</div>}
            {filteredOptions && this.renderOptions(filteredOptions)} 
          </div>)
  }

  getPlaceHolderTxt = () => this.props.placeholder

  renderCustomSelect = () => {
    const { isOptionPanelOpen, token } = this.state
    
    return (
      <div className="autocomplete-wrapper">
        {isOptionPanelOpen && <div onClick={this.toggleOptionPanel} className={"overlay"}> </div>}
        <div className="autocomplete-input-section">
          {this.renderSearchTextBox()}
          {!isEmpty(token) && <span className={"f16 m12 clear-all"} onClick={() => this.onOptionSelection({}, CLEAR_SEARCH)}> X </span>}
          {isOptionPanelOpen && this.renderOptionPanel()}
        </div>
      </div>
    )
  }
  
  handleKeyUp(index, optionElemsArray) {
    if (index >= 0) {
      if (index === 0) {
        optionElemsArray[optionElemsArray.length - 1].classList.add('options-panel-item-hover');
        this.focusedElement = optionElemsArray[optionElemsArray.length - 1];
      } else {
        optionElemsArray[index - 1].classList.add('options-panel-item-hover');
        this.focusedElement = optionElemsArray[index - 1];
      }
    }
  }

  handleKeyDown(index, optionElemsArray) {
    if (index >= 0) {
      if (index === optionElemsArray.length - 1) {
        optionElemsArray[0].classList.add('options-panel-item-hover');
        this.focusedElement = optionElemsArray[0];
      } else {
        optionElemsArray[index + 1].classList.add('options-panel-item-hover');
        this.focusedElement = optionElemsArray[index + 1];
      }
    }
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
  options: PropTypes.array,
  placeholder: PropTypes.string, 
}


Select.defaultProps = {
  isSearchable: true,
  options: [],
  onChange: () => {},
  placeholder: "Search...",
};