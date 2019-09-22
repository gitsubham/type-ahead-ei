import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'

import Select from '../components/common/Select'
import { fetchMovies } from '../actions' 

const transFormOptions = movies => {
  return movies.map(movie => ({ label: movie.Title, value: movie.imdbID, year: movie.Year }))
}

const customOptionsCreator = (props) => {
  return (
    <React.Fragment>
      <div> {props.data.label} </div>
      <div> {props.data.year} </div>
    </React.Fragment>
  )
}

class MovieTypeAhead extends Component {

  fetchMovies = token => {
    const { fetchMovies } = this.props
    fetchMovies(token)
  } 

  render() {
    const { movies, isFetchingMovie, isErrorOnMovieFetch } = this.props
    const selectProps = {
      cacheOptions: true,
      customOptionsCreator,
      handleInputChange: this.fetchMovies,
      isLoading: isFetchingMovie,
      isMulti: true,
      options: transFormOptions(movies),
    }

    return (<Select {...selectProps} />) 
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    movies: getMovieState(state, 'movies'),
    isFetchingMovie: getMovieState(state, 'isFetchingMovie'),
    isErrorOnMovieFetch: getMovieState(state, 'isErrorOnMovieFetch'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: token => dispatch(fetchMovies(token)) 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieTypeAhead);

const getMovieState = (state, path) => {
  return getState(state, `movie.${path}`)
}

const getState = (state, path) => {
  return get(state, path) 
}