import React from 'react'
import Logo from '../tonedeafV2.png'

export default class Home extends React.Component {
    render(){
        return(
            <div>
                <img className="homeLogo" src={Logo}></img>
            </div>

        )
    }
}