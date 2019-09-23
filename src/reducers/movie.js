import { INIT_MOVIES, MOVIE_FETCH_REQUESTED, MOVIE_FETCH_COMPLETED, MOVIE_FETCH_ERROR,
  UPDATE_CUSTOM_ERROR_MESSAGE } from '../actions/actionTypes' 

const INITIAL_STATE = {
  movies: [],
  isFetchingMovie: false,
  isErrorOnMovieFetch: false,
}

const movie = (state = INITIAL_STATE, action) => {
  const { movies, customMovieError, error } = action

  switch (action.type) {
    case MOVIE_FETCH_REQUESTED: 
      return { ...state, isFetchingMovie: true }
    case MOVIE_FETCH_COMPLETED:
      return { ...state, movies, customMovieError, isFetchingMovie: false }
    case MOVIE_FETCH_ERROR:
      console.log(error)
      return { ...state, isErrorOnMovieFetch: true, isFetchingMovie: false }
    case UPDATE_CUSTOM_ERROR_MESSAGE: 
      return { ...state, movies: [], customMovieError }
    case INIT_MOVIES:
    default:
      return state
    }
}  

export default movie;