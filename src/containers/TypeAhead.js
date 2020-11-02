import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Select } from '../components'
import { fetchUsers, updateCustomErrorMessage } from '../actions'
import { getUsersState } from '../utils'
import { TYPE_AHEAD_PLACEHOLDER } from '../constants'

const transFormOptions = options => {
  if (!options) return []
  return options.map(option => ({ label: option.name, value: option.id, ...option }))
}

const customOptionsCreator = (option, props) => {
  return (
    <React.Fragment>
      <div className='f16'> <b> {option.value} </b> </div>
      <div> {option.label} </div>
      <div className='f12'> {option.address} </div>
    </React.Fragment>
  )
}

class TypeAhead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isUserSearchAllowed: true,
      selections: [], 
      selectedOptionsCount: 0,
    }
  }

  fetchUsers = token => {
    const { fetchUsers } = this.props
    fetchUsers(token)
  }

  getNoOptionsMessage = () => (this.props.customError)

  onSelectChange = ({ selectedOption }) => {
    // noop
  }

  render() {
    const { users, isFetchingUser } = this.props
    console.log(this.props.users, 'XX')
    const { isUserSearchAllowed } = this.state
    
    const selectProps = {
      customOptionsCreator,
      handleInputChange: this.fetchUsers,
      isLoading: isFetchingUser,
      isSearchable: isUserSearchAllowed,
      noOptionsMessage: this.getNoOptionsMessage,
      options: transFormOptions(users),
      onChange: this.onSelectChange,
      placeholder: TYPE_AHEAD_PLACEHOLDER,
    }

    return (<Select {...selectProps} />)
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    ...ownProps,
    customError: getUsersState(state, 'customError'),
    isFetchingUser: getUsersState(state, 'isFetchingUser'),
    isErrorOnUsersFetch: getUsersState(state, 'isErrorOnUsersFetch'),
    users: getUsersState(state, 'users'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: token => dispatch(fetchUsers(token)),
    updateCustomErrorMessage: errMsg => dispatch(updateCustomErrorMessage(errMsg)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TypeAhead);