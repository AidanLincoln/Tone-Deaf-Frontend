import React from 'react'
import Logo from '../tonedeafV2.png'

export default class Home extends React.Component {
    render(){
        return(
            <div>
                <div className="glow"></div>
                <img className="homeLogo" src={Logo}></img>
                <h4 className="homeDescription">Explore scales, create chords, and build chord progressions.</h4>
            </div>

        )
    }
}