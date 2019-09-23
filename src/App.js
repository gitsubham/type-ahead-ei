import React from 'react';

import './App.css';
import '../src/style.css'
import MovieTypeAhead from './containers/MovieTypeAhead'

export default class App extends React.Component {
  render(){
    return <div className={"m100"}> <MovieTypeAhead /> </div>
  }
}
