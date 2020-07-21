import React from 'react'
import Logo from '../tonedeafV2.png'

export default class Home extends React.Component {
    render(){
        return(
            <div>
                <img className="homeLogo" src={Logo}></img>
                <h4 className="homeDescription">Explore scales, generate chords, and build chord progressions.</h4>
            </div>

        )
    }
}