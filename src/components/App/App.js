import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from "react-router-dom";
//components
import Home from "../Home/Home";
import Header from "../Header/Header";

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
        </div>
        <Route exact path='/' component={Home}/>
      </Router>
    );
  }
}

export default App;
