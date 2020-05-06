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
            if (res.hasOwnProperty("user")){
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
    
    handleRedirect = () => {
        this.props.history.push('/create-account')
    }

    render(){
        return(
            <div id="sign-in">
                {!!this.state.errors ? <h3 style={{color: 'white'}}>Invalid username or password.</h3> : null}
                <br></br><br></br>
                <br></br><br></br>
                <div className="accountForm">
                    <h1 className="formHeader">Sign-in</h1>
                    <form id="sign-in-form" onSubmit={this.handleSubmit}>
                        <label className="formLabel">Username</label>
                        <br></br>
                        <input className="formInput" type='text' placeholder='username' name='username' onChange={this.handleChange}/><br></br><br></br>
                        <label className="formLabel">Password</label>
                        <br></br>
                        <input className="formInput" type='password' placeholder='password' name='password' onChange={this.handleChange}/><br></br>
                        <br></br>
                        <input className={"niceButton"} type="submit" value="Sign-in"></input>
                        <br></br><br></br>
                    </form>
                </div>
                <br></br>
                <span style={{color: "white", fontSize: "large", fontWeight: "bold"}}>New to Tone Deaf?</span>
                <br></br>
                <div className="seperationLine"></div>         
                <br></br>
                <button className="niceButton" onClick={this.handleRedirect}>Create an account</button>
            </div>
        )
    }
}