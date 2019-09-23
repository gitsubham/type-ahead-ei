import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Select } from '../components'
import { fetchMovies, updateCustomErrorMessage } from '../actions'
import { getMovieState } from '../utils' 
import { MOVIE_TYPE_AHEAD_PLACEHOLDER, ERR_MSG_ON_MAX_MOVIE_SELECTION, NO_MOVIES_AVAILABLE,
  MAX_MOVIE_SELECTIONS_ALLOWED } from '../constants'

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
  constructor(props) {
    super(props)
    this.state = { isMovieSearchAllowed: true }
  }

  fetchMovies = token => {
    const { fetchMovies } = this.props

    fetchMovies(token)
  }

  getNoOptionsMessage = () => (this.props.customMovieError)

  onSelectChange = (selections, action) => {
    console.log(selections, action)
    const { updateCustomErrorMessage } = this.props
    if (selections && selections.length >= MAX_MOVIE_SELECTIONS_ALLOWED) {
      updateCustomErrorMessage(ERR_MSG_ON_MAX_MOVIE_SELECTION)
      this.setState({ isMovieSearchAllowed: false })
    } else if (action.action === "pop-value") {
      this.setState({ isMovieSearchAllowed: true })
      updateCustomErrorMessage(NO_MOVIES_AVAILABLE)
    }
  }

  render() {
    const { movies, isFetchingMovie } = this.props
    const { isMovieSearchAllowed } = this.state
    
    const selectProps = {
      cacheOptions: true,
      customStyles: getCustomStyles(),
      customOptionsCreator,
      handleInputChange: this.fetchMovies,
      isLoading: isFetchingMovie,
      isMulti: true,
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