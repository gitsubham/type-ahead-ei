import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import Select from '../components/common/Select'
import { fetchMovies } from '../actions' 
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const transFormOptions = movies => {
  return movies.map(movie => ({ label: movie.Title, key: movie.imdbID }))
}

class MovieTypeAhead extends Component {
  constructor(props) {
    super(props);
  }

  fetchMovies = token => {
    const { fetchMovies } = this.props
    fetchMovies(token)
  } 

  render() {
    console.log("redered MovieTypeAhead",this.props)
    const { movies, isFetchingMovie, isErrorOnMovieFetch } = this.props
    const selectProps = {
      isAsync: false,
      isMulti: true,
      cacheOptions: true,
      options: transFormOptions(movies),
      isLoading: isFetchingMovie,
      handleInputChange: this.fetchMovies,
      
    }
    return (<Select {...selectProps} 
    />) 
  }
}


const mapStateToProps = (state, ownProps) => {
  console.log("CCCCCCCCCCCCCCC", state)
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