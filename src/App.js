import React, { Component } from 'react';
import './App.css';
import Header from './header/Header';
import AddressSearch  from './content/AddressSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <AddressSearch/>
      </div>
    );
  }
}

export default App;
