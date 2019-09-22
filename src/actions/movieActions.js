import { MOVIE_FETCH_REQUESTED, MOVIE_FETCH_COMPLETED, MOVIE_FETCH_ERROR } from './actionTypes'
import { movieService } from "../services"

export const fetchMovies = token => async (dispatch) => {
  dispatch({ type: MOVIE_FETCH_REQUESTED })
  try {
    let movies = await movieService.getMovies(token)
    let customMovieError = ''
    console.log(movies, 'MOVIES')
    if (movies.resp.Response === "True") {
      movies = movies.resp.Search
    } else {
      customMovieError = movies.resp.Error
      movies = []
    }
    
      
    dispatch({ type: MOVIE_FETCH_COMPLETED, movies, customMovieError })
  } catch(error) {
    console.log(error)
    dispatch({ type: MOVIE_FETCH_ERROR, error })
  }
}
