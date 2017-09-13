import React, { Component } from 'react';
import './App.css';
import Characters from './Characters';
import './Characters.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>May the Force be with you</h2>
        </div>
        <Characters></Characters>
      </div>
    );
  }
}

export default App;
