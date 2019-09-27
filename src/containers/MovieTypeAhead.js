import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Select } from '../components'
import { fetchMovies, updateCustomErrorMessage } from '../actions'
import { getMovieState } from '../utils'
import { MOVIE_TYPE_AHEAD_PLACEHOLDER, ERR_MSG_ON_MAX_MOVIE_SELECTION, MAX_MOVIE_SELECTIONS_ALLOWED,
  PUSH_OPTION, POP_OPTION, CLEAR_ALL_SELECTIONS, } from '../constants'

const transFormOptions = movies => {
  return movies.map(movie => ({ label: movie.Title, value: movie.imdbID, year: movie.Year }))
}

const customOptionsCreator = (option, props) => {
  return (
    <React.Fragment>
      <div> <b> {option.label} </b> </div>
      <div> {option.year} </div>
    </React.Fragment>
  )
}

class MovieTypeAhead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMovieSearchAllowed: true,
      selections: [], 
      selectedOptionsCount: 0,
    }
  }

  fetchMovies = token => {
    const { fetchMovies } = this.props
    fetchMovies(token)
  }

  getNoOptionsMessage = () => (this.props.customMovieError)

  onSelectChange = ({ selectedOption, selections, action }) => {
    const { updateCustomErrorMessage } = this.props
    if (action === PUSH_OPTION && selections.length >= MAX_MOVIE_SELECTIONS_ALLOWED - 1) {
      this.setState({ isMovieSearchAllowed: false})
      updateCustomErrorMessage(ERR_MSG_ON_MAX_MOVIE_SELECTION)
    } else if ((action === POP_OPTION && selections.length === 4) || action === CLEAR_ALL_SELECTIONS) {
      this.setState({ isMovieSearchAllowed: true})
      updateCustomErrorMessage('')
    }
  }

  render() {
    const { movies, isFetchingMovie } = this.props
    const { isMovieSearchAllowed } = this.state
    
    const selectProps = {
      customOptionsCreator,
      handleInputChange: this.fetchMovies,
      isLoading: isFetchingMovie,
      isSearchable: isMovieSearchAllowed,
      noOptionsMessage: this.getNoOptionsMessage,
      options: transFormOptions(movies),
      onChange: this.onSelectChange,
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
    fetchMovies: token => dispatch(fetchMovies(token)),
    updateCustomErrorMessage: errMsg => dispatch(updateCustomErrorMessage(errMsg)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieTypeAhead);