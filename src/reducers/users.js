import { INIT_USERS, USERS_FETCH_REQUESTED, USERS_FETCH_COMPLETED, USERS_FETCH_ERROR,
  UPDATE_CUSTOM_ERROR_MESSAGE } from '../actions/actionTypes' 

const INITIAL_STATE = {
  users: [],
  isFetchingUser: false,
  isErrorOnUsersFetch: false,
}

const users = (state = INITIAL_STATE, action) => {
  const { users, customError, error } = action

  switch (action.type) {
    case USERS_FETCH_REQUESTED: 
      return { ...state, isFetchingUser: true }
    case USERS_FETCH_COMPLETED:
      return { ...state, users, customError, isFetchingUser: false }
    case USERS_FETCH_ERROR:
      console.log(error)
      return { ...state, isErrorOnUsersFetch: true, isFetchingUser: false }
    case UPDATE_CUSTOM_ERROR_MESSAGE: 
      return { ...state, users: [], customError }
    case INIT_USERS:
    default:
      return state
    }
}  

export default users;