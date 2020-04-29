import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { api } from './services/api'

import Navbar from './components/Navbar'
import Piano from './components/Piano'
import SignIn from './components/SignIn'
import CreateAccount from './components/CreateAccount'
import ChordGenerator from './components/ChordGenerator'
import Home from './components/Home'
import Scales from './components/Scales'
import MyChords from './components/MyChords'

import store from './redux/store'
import {Provider} from 'react-redux'
import {fetchUsers} from './redux'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {
        user: {},
        errors: false
      },
      scales: []
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      api.auth.getCurrentUser().then(user => {
        this.setState({ auth: {user} });
      });
    }
    api.collections.getScales()
    .then(data => {
        this.setState({
            scales: data
        })
    })
  }

  createUser = (res) => {
    this.signIn(res)
  }

  signIn = (data) => {
    console.log(data)
    if(data.hasOwnProperty('user')){
      let user = { user: {id: data.user.id,  username: data.user.username}};
      localStorage.setItem("token", data.jwt);
      this.setState({ 
      auth: user
    });
    }
  };

  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      auth: { user: {} },
      errors: null
    });
  };

  postChord = (notesObj, scaleName) => {
    let obj = {
      scale_name: scaleName,
      is_scale: false,
      user_id: this.state.auth.user.id,
      notes: notesObj
    }
    console.log(obj)
    api.collections.postNewChord(obj).then(res => {
      console.log(res)
    })
  }

  render(){
    return (
        <div className="App">
          <Router>
          <header className="App-header">
            <Navbar user={this.state.auth.user} onSignOut={this.signOut}/>
          </header>
          <div className = "main">

            <Route
              exact
              path="/sign-in"
              render={ props => <SignIn {...props} onSignIn={this.signIn} />}/>

            <Route
              exact
              path="/create-account"
              render={ props => <CreateAccount {...props} error={this.state.auth.errors} onCreateUser={this.createUser} />}/>

            <Route
              exact
              path="/chord-generator"
              render={ props => <ChordGenerator {...props} saveChord={this.postChord} allScales={this.state.scales}/>}/>

            <Route
              exact
              path="/"
              render={ props => <Home {...props} />}/>

            <Route
              exact
              path="/scales"
              render={ props => <Scales {...props} allScales={this.state.scales} />}/>
            
            <Route
              exact
              path="/my-chords"
              render={ props => <MyChords {...props} user={this.state.auth} />}/>

          </div>
          </Router>
        </div>
    );
  }
}

