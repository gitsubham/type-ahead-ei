import React from 'react';
import { connect } from 'react-redux'; 
import { get } from 'lodash';

import './App.css';
import '../src/style.css'
import 'bootstrap/dist/css/bootstrap.css'

// import Root from './Root'
import MovieTypeAhead from './containers/MovieTypeAhead'

export default class App extends React.Component {
  render(){
    return <div className={"m100"}> <MovieTypeAhead /> </div>
  }
}
