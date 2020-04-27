import React from 'react'
import { NavLink } from 'react-router-dom';

export default class Navbar extends React.Component {
    render(){
        const link = {
        //   width: '100px',
        //   padding: '12px',
        //   margin: '0 6px 6px',
        //   color: 'black',
        }
    
        return (
            <div className="navbar">
                <NavLink
                className="navLink"
                to="/"
                exact
                // style={link}
                // activeStyle={{
                // background: "black"
                // }}
                >Tone Deaf
                </NavLink>

                <NavLink
                className="navLink"
                to="/chord-generator"
                exact
                // style={link}
                // activeStyle={{
                //   background: 'black'
                // }}
                >Chord Generator
                </NavLink>
                
                <NavLink
                className="navLink"
                to="/scales"
                exact
                // style={link}
                // activeStyle={{
                // background: "black"
                // }}
                >Scales
                </NavLink>

                {/* Only render if user is not logged in */}
  
                <NavLink
                className="navLink"
                to="/sign-in"
                exact
                // style={link}
                // activeStyle={{
                // background: "black"
                // }}
                >Sign-In
                </NavLink>

                <NavLink
                className="navLink"
                to="/create-account"
                exact
                // style={link}
                // activeStyle={{
                // background: "black"
                // }}
                >Create Account
                </NavLink>

                {/* Only render if user is logged in  */}
        
                <NavLink
                className="navLink"
                to="/my-chords"
                exact
                // style={link}
                // activeStyle={{
                // background: "black"
                // }}
                >My Chords
                </NavLink>

                <NavLink
                className="navLink"
                to="/"
                exact
                // style={link}
                // activeStyle={{
                // background: "black"
                // }}
                onClick={this.props.onSignOut}
                >Sign-Out
                </NavLink>
            </div>
        )
    }
}