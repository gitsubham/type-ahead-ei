import { get, isEmpty } from 'lodash'

import { USERS_FETCH_REQUESTED, USERS_FETCH_COMPLETED, USERS_FETCH_ERROR,
  UPDATE_CUSTOM_ERROR_MESSAGE } from './actionTypes'
import { userService } from "../services"

export const fetchUsers = token => async (dispatch) => {
  dispatch({ type: USERS_FETCH_REQUESTED })
  
  try {
    let users = await userService.getUsers(token)
    let customError = ''
    if (isEmpty(users)) {
      customError = get(users, 'resp.Error')
      users = []
    }
    dispatch({ type: USERS_FETCH_COMPLETED, users, customError })
  } catch(error) {
    dispatch({ type: USERS_FETCH_ERROR, error })
  }
}


export const updateCustomErrorMessage = customError => {
  return {
    type: UPDATE_CUSTOM_ERROR_MESSAGE,
    customError
  }
} 

