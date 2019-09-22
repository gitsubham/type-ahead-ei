import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { Select } from '../components'
import { fetchMovies } from '../actions' 
import { MOVIE_TYPE_AHEAD_PLACEHOLDER } from '../constants'

const transFormOptions = movies => {
  return movies.map(movie => ({ label: movie.Title, value: movie.imdbID, year: movie.Year }))
}

const getCustomStyles = () => {
  return {
    control: styles => ({ ...styles, backgroundColor: 'white',
      'font-size': '20px', 'border-radius': '20px' }),
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        'border-radius': '20px',
        'font-size': '20px',
      };
    },
  };
}

const customOptionsCreator = (props) => {
  return (
    <React.Fragment>
      <div> <b> {props.data.label} </b> </div>
      <div> {props.data.year} </div>
    </React.Fragment>
  )
}

class MovieTypeAhead extends Component {

  fetchMovies = token => {
    const { fetchMovies } = this.props
    fetchMovies(token)
  }

  getNoOptionsMessage = () => (this.props.customMovieError)

  render() {
    const { movies, isFetchingMovie, isErrorOnMovieFetch, customMovieError } = this.props
    const selectProps = {
      cacheOptions: true,
      customStyles: getCustomStyles(),
      customOptionsCreator,
      handleInputChange: this.fetchMovies,
      isLoading: isFetchingMovie,
      isMulti: true,
      noOptionsMessage: this.getNoOptionsMessage,
      options: transFormOptions(movies),
      placeholder: MOVIE_TYPE_AHEAD_PLACEHOLDER,
    }

    return (<Select {...selectProps} />) 
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    customMovieError: getMovieState(state, 'customMovieError'),
    isFetchingMovie: getMovieState(state, 'isFetchingMovie'),
    isErrorOnMovieFetch: getMovieState(state, 'isErrorOnMovieFetch'),
    movies: getMovieState(state, 'movies'),
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