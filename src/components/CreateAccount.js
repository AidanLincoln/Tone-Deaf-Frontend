import React from 'react'
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

    handleRedirect = () => {
        this.props.history.push('/sign-in')
    }

    render(){
        return (
            
            <div id="create-account">
                {!!this.state.error ? <h3 style={{color: 'white'}}>This username has already been taken.</h3> : null}
                <br></br><br></br>
                <br></br><br></br>
                <div className="accountForm">
                    <h1 className="formHeader">Create an Account</h1>
                    <form id="create-account-form" onSubmit={this.handleSubmit}>
                        <label className='formLabel'>Username</label>
                        <br></br>
                        <input className='formInput' type='text' placeholder='username' name='username'/><br></br><br></br>
                        <label className='formLabel' >Password</label>
                        <br></br>
                        <input className='formInput' type='password' placeholder='password' name='password'/><br></br>
                        <br></br>
                        <input className={"niceButton"} type="submit" value="Create account"></input>
                        <br></br>
                        <br></br>
                    </form>
                </div>
                <br></br>
                <span style={{color: "white", fontSize: "large", fontWeight: "bold"}}>Already have an account?</span>
                <br></br>
                <div className="seperationLine"></div>         
                <br></br>
                <button className="niceButton" onClick={this.handleRedirect}>Sign-in</button>
            </div>
        )
    }
}
