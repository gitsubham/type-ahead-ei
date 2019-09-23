import { get } from 'lodash'

const getState = (state, path) => {
    return get(state, path)
}

export const getMovieState = (state, path) => {
    return getState(state, `movie.${path}`)
}