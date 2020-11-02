import React from 'react';

import './App.css';
import '../src/style.css'
import TypeAhead from './containers/TypeAhead'

export default class App extends React.Component {
  render(){
    return <div className={"m100"}> <TypeAhead /> </div>
  }
}
