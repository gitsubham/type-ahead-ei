import { get } from 'lodash'

import { MOVIE_FETCH_REQUESTED, MOVIE_FETCH_COMPLETED, MOVIE_FETCH_ERROR,
  UPDATE_CUSTOM_ERROR_MESSAGE } from './actionTypes'
import { movieService } from "../services"

export const fetchMovies = token => async (dispatch) => {
  dispatch({ type: MOVIE_FETCH_REQUESTED })
  
  try {
    let movies = await movieService.getMovies(token)
    let customMovieError = ''
    if (movies && get(movies, 'resp.Response') === "True") {
      movies = movies.resp.Search
    } else {
      customMovieError = get(movies, 'resp.Error')
      movies = []
    }
    dispatch({ type: MOVIE_FETCH_COMPLETED, movies, customMovieError })
  } catch(error) {
    dispatch({ type: MOVIE_FETCH_ERROR, error })
  }
}


export const updateCustomErrorMessage = customMovieError => {
  return {
    type: UPDATE_CUSTOM_ERROR_MESSAGE,
    customMovieError
  }
} 

