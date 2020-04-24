import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Piano from './components/Piano'
import {BrowserRouter as Router, Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <Navbar/>
      </header>

      </Router>
    </div>
  );
}

export default App;
