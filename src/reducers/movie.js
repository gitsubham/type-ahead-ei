import { INIT_MOVIES, MOVIE_FETCH_REQUESTED, MOVIE_FETCH_COMPLETED, MOVIE_FETCH_ERROR } from '../actions/actionTypes' 

const INITIAL_STATE = {
  movies: [],
  isFetchingMovie: false,
  isErrorOnMovieFetch: false,
}

const movie = (state = INITIAL_STATE, action) => {
  const { movies, customMovieError } = action

  switch (action.type) {
    case INIT_MOVIES:
    default: 
      return state
    case MOVIE_FETCH_REQUESTED: 
      return { ...state, isFetchingMovie: true }
    case MOVIE_FETCH_COMPLETED:
      return { ...state, movies, customMovieError, isFetchingMovie: false }
    case MOVIE_FETCH_ERROR: 
      return { ...state, isErrorOnMovieFetch: true, isFetchingMovie: false }
    }
}  

export default movie;