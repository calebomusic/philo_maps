import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div className="app">
        <div className="first-tower">
        </div>
        <div className="center">
          Hello
        </div>
        <div className="second-tower">
        </div>
      </div>
    );
  }
}

export default App;