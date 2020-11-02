import { get } from 'lodash'

const getState = (state, path) => {
    return get(state, path)
}

export const getUsersState = (state, path) => {
    return getState(state, `users.${path}`)
}