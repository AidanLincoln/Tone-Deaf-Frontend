import React from 'react'
import { connect } from "react-redux"
import { postUser } from '../redux'

export default class CreateAccount extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onCreateUser(event)
        event.target.username.value = ''
        event.target.password.value = ''
    }

    render(){
        return (
            
            <div id="create-account">
                <h1>Create an Account</h1>
                {!!this.props.errors ? <h3 style={{color: 'white'}}>This username has already been taken.</h3> : null}
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
