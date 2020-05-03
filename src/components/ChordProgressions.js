import React from 'react'
import { api } from '../services/api'
import { PolySynth, Synth } from 'tone'
import Piano from './Piano'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ChordProgressions extends React.Component {
    constructor(){
        super()
        this.state = {
            
        }
    }
    componentDidMount(){
        api.collections.getUsersChords(this.props.user.id).then((res) => {
            console.log(res)
        })
    }

    render(){
        return(
            <h1>My Chord Progressions</h1>
        )
    }
}