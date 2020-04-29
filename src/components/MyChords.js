import React from 'react'
import {api} from '../services/api'

export default class MyChords extends React.Component {
    constructor(){
        super()
        this.state = {
            collections: []
        }
    }
    componentDidMount(){
        console.log(this.props.user.user.id)
        api.collections.getUsersChords(this.props.user.user.id)
        .then(res => {
            this.setState({
                collections: res.collections
            })
        })
    }

    renderChords = () => {
        if(!!this.state.collections){

            return this.state.collections.map(chord => {
                let noteArray = []
                chord.collection_notes.forEach(note => {
                    noteArray.push(note.name)
                })
                console.log(chord)
                return <li>
                    <h4>Scale: {chord.collection_info.scale_name}</h4> 
                    <h4>Notes: {noteArray.toString()}</h4>
                    <h4>Date: {chord.collection_info.created_at}</h4>
                    <br></br><br></br>
                    </li>
            })
        }
    }

    render(){
        return(
            <div>
                {this.state.collections.length > 0 ? <ul>{this.renderChords()}</ul> : <h1>No Chords found.</h1>}

            </div>
        )
    }
}