import React from 'react'
import { api } from '../services/api'

export default class SignIn extends React.Component {
    constructor(){
        super()
        
        this.state = {
            errors: false,
            fields: {
                username: "", 
                password: ""
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        api.auth.login(this.state.fields).then(res => {
            console.log(res)
            if (res.hasOwnProperty("user")){
                console.log(res)
                this.props.onSignIn(res);
                this.props.history.push('/')
            } else {
                this.setState({errors: true})
            }
        })
    }

    handleChange = (event) => {
        const newFields = {...this.state.fields, [event.target.name]: event.target.value}
        this.setState({
                fields: newFields
        })      
    }

    render(){
        return(
            <div id="sign-in">
                <h1>Sign-in</h1>
                {!!this.state.errors ? <h3 style={{color: 'white'}}>Invalid username or password.</h3> : null}
                <form id="sign-in-form" onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <br></br>
                    <input type='text' placeholder='username' name='username' onChange={this.handleChange}/><br></br><br></br>
                    <label>Password</label>
                    <br></br>
                    <input type='password' placeholder='password' name='password' onChange={this.handleChange}/><br></br>
                    <br></br>
                    <br></br>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }

}