import React, { Component } from 'react';
import AdForm from './AdForm';
import AdList from './AdList';

class App extends Component {

  render() {
    return (
      <div className="App">
        <AdForm/>
        <AdList/>
      </div>
    );
  }
}

export default App;
