import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { api } from './services/api'

import Navbar from './components/Navbar'
import SignIn from './components/SignIn'
import CreateAccount from './components/CreateAccount'
import ChordGenerator from './components/ChordGenerator'
import Home from './components/Home'
import Scales from './components/Scales'
import MyChords from './components/MyChords'
import ChordProgressions from './components/ChordProgressions'

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
      scales: [],
      usersChords: null
    };
  }
  componentDidMount() {
    let token = localStorage.getItem("token");
    if (token) {
      api.auth.getCurrentUser().then(user => {
        this.setState({ auth: {user} }, () => {
          this.updateUsersChords()
        });
      });
    }
    api.collections.getScales()
    .then(data => {
        this.setState({
            scales: data
        })
    })
  }

  // componentDidUpdate(){
  //   if(!!localStorage.getItem("token") && this.state.usersChords === null){
  //     api.auth.getCurrentUser().then(user => {
  //       this.updateUsersChords()
  //     });
      
  //   } 
  // }

  updateUsersChords = () => {
    if(!!this.state.auth.user){
      api.collections.getUsersChords(this.state.auth.user.id).then((res) => {
        console.log(res.collections)
        // let sortedCollections = res.collections.sort((a,b) => {
        //   return a.collection_info.id - b.collection_info.id
        // })
        this.setState({
            usersChords: res.collections
        })
        console.log('chordsDidUpdate')
        console.log(res)
      })
    }
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
      errors: null,
      usersChords: null
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

  sortNotes = (notes) => {
    let notePlacementObj = {
        'A': 1,
        'A#': 2,
        'B': 3,
        'C': 4,
        'C#': 5,
        'D': 6,
        'D#': 7,
        'E': 8,
        'F': 9,
        'F#': 10,
        'G': 11,
        'G#': 12,
        'A2': 13,
        'A#2': 14,
        'B2': 15,
        'C2': 16,
        'C#2': 17,
        'D2': 18,
        'D#2': 19,
        'E2': 20,
        'F2': 21,
        'F#2': 22,
        'G2': 23,
        'G#2': 24
    }
    let noteNums = notes.map(note => {
        return notePlacementObj[note]
    })
    noteNums.sort((a,b) => {
        return a - b
    })
    let sortedNotes = []
    noteNums.forEach(num => {
        for(let key in notePlacementObj){
            if(notePlacementObj[key] === num){
                sortedNotes.push(` ${key}`)
            }
        }
    })
    return sortedNotes
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
              path="/chord-progressions"
              render={ props => <ChordProgressions {...props} key={"CPKey"} sortNotes={this.sortNotes} updateUsersChords={this.updateUsersChords} usersChords={this.state.usersChords} user={this.state.auth.user}/>}/>

            <Route
              exact
              path="/create-account"
              render={ props => <CreateAccount {...props} error={this.state.auth.errors} onCreateUser={this.createUser} />}/>

            <Route
              exact
              path="/chord-generator"
              render={ props => <ChordGenerator {...props} user={this.state.auth.user} saveChord={this.postChord} allScales={this.state.scales}/>}/>

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
              render={ props => <MyChords {...props} updateUsersChords={this.updateUsersChords} sortNotes={this.sortNotes} usersChords={this.state.usersChords} user={this.state.auth} />}/>

          </div>
          </Router>
        </div>
    );
  }
}

