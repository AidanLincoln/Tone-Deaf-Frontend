import React from 'react'
import { NavLink } from 'react-router-dom';
import Logo from '../tonedeafV2.png'

export default class Navbar extends React.Component {
    render(){
        const link = {
          padding: '2px',
          margin: '0 10px 10px',
          color: 'black',
        }
    
        return (
            <div>
                <NavLink
                className="navHome"
                to="/"
                exact
                style={{
                    position: 'absolute',
                    padding: '2px',
                    margin: '0 6px 6px',
                    color: 'black',
                    float: 'left',
                    paddingTop: '30px',
                    textDecoration: "none",
                    left: "-590px",
                    top: '-2px'
                }}
                activeStyle={{
                    fontWeight: 'bolder'
                }}
                >
                    <img className="navLogo" src={Logo}></img>

                </NavLink>

            <div className="navbar">
                <NavLink
                className="navLink"
                to="/chord-generator"
                exact
                style={link}
                activeStyle={{
                    fontWeight: 'bolder'
                }}
                >Chord Generator
                </NavLink>

                <NavLink
                className="navLink"
                to="/chord-creator"
                exact
                style={link}
                activeStyle={{
                    fontWeight: 'bolder'
                }}
                >Chord Creator
                </NavLink>
                
                <NavLink
                className="navLink"
                to="/scales"
                exact
                style={link}
                activeStyle={{
                    fontWeight: 'bolder'
                }}
                >Scales
                </NavLink>

                {/* Only render if user is not logged in */}
                {!localStorage.getItem('token') ?
                <NavLink
                className="navLink"
                to="/sign-in"
                exact
                style={link}
                activeStyle={{
                    fontWeight: 'bolder'
                }}
                >Sign-In
                </NavLink>:null}

                {/* {!localStorage.getItem('token') ?
                <NavLink
                className="navLink"
                to="/create-account"
                exact
                style={link}
                activeStyle={{
                    fontWeight: 'bolder'
                }}
                >Create Account
                </NavLink>:null} */}

                {/* Only render if user is logged in  */}
                {!!localStorage.getItem('token') ? 
                <NavLink
                className="navLink"
                to="/my-chords"
                exact
                style={link}
                activeStyle={{
                    fontWeight: 'bolder'
                }}
                >My Chords
                </NavLink> : null}

                {!!localStorage.getItem('token') ? 
                <NavLink
                className="navLink"
                to="/chord-progressions"
                exact
                style={link}
                activeStyle={{
                    fontWeight: 'bolder'
                }}
                >Chord Progressions
                </NavLink> : null}
                
                {!!localStorage.getItem('token') ?
                <NavLink
                className="navLink"
                to="/"
                exact
                style={link}
                onClick={this.props.onSignOut}
                >Sign-Out
                </NavLink>: null}
            </div>
            </div>
        )
    }
}