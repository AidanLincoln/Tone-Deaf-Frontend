import React from 'react'
import { connect } from "react-redux"
import { postUser } from '../redux'
import { api } from '../services/api'

export default class CreateAccount extends React.Component {
    state = {
        error: false
    }
    handleSubmit = (event) => {
        event.preventDefault();

        let newUser = {
            username: event.target.username.value,
            password: event.target.password.value
          }
          api.auth.createUser(newUser).then(res => {
             if (res.hasOwnProperty("user")){
                 console.log(res)
                this.setState({error: false})
              this.props.onCreateUser(res);
              this.props.history.push('/')

            } else {    
                this.setState({error: true})
            }
          })



        // this.props.onCreateUser(event);
        // event.target.username.value = ''
        // event.target.password.value = ''
        // console.log(this.props.error)
        // if(!this.props.error){
        //     this.props.history.push('/')
        // }
    }

    

    render(){
        return (
            
            <div id="create-account">
                <h1>Create an Account</h1>
                {!!this.state.error ? <h3 style={{color: 'white'}}>This username has already been taken.</h3> : null}
                <form id="create-account-form" onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <br></br>
                    <input type='text' placeholder='username' name='username'/><br></br><br></br>
                    <label>Password</label>
                    <br></br>
                    <input type='password' placeholder='password' name='password'/><br></br>
                    <br></br>
                    <br></br>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}
