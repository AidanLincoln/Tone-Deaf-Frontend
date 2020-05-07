import React from 'react'
import {api} from '../services/api'
import { PolySynth, Synth } from 'tone'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class MyChords extends React.Component {
    
    componentDidMount(){
        api.collections.getUsersChords(this.props.user.user.id)
        .then(res => {
            this.props.updateUsersChords()
        })
    }
    
    handlePlayClick= (noteArray) => {
        let configNoteArray = noteArray.map(note => {
            if(!note.includes('2')){
                return `${note}3`
            }else{
                if(note.includes('2')){
                    if(note.includes('#')){
                        return `${note.slice(0,2)}4`
                    }else{
                        return `${note[0]}4`
                    }
                }
            }
        })
        console.log('Configured note array')
        console.log(configNoteArray)
        const polySynth = new PolySynth({
            polyphony: 8,
            volume : -7 ,
            detune : 0 ,
            voice : Synth
            }).toMaster();
        polySynth.triggerAttackRelease(configNoteArray, "2.8");
    }
    
    handleDelete = (chordId) => {
        api.collections.destroyChord(chordId).then(message => {
            console.log(message)
        }).then(() => {
            this.props.updateUsersChords()
        })
    }

    addChordToProgression = (collectionId, progressionNum) => {
        api.collections.addChordToProgression(collectionId, progressionNum)
        .then((res) => {
            console.log("Chord added to progression")
            console.log(res)
        })
    }

    renderChords = () => {
        if(!!this.props.usersChords){
            if(this.props.usersChords.length > 0){       
                return this.props.usersChords.map((chord, index) => {
                    let noteArray = []
                    let notesToPlay = []
                    chord.collection_notes.forEach(note => {
                        notesToPlay.push(note.name)
                    })
                    noteArray = this.props.sortNotes(notesToPlay)
                    return <li className="myChords" key={index} style={{listStyleType: "none"}}>
                        <br></br>
                        <div className="row">
                            <div className="col-6">
                                <h4><span className="textBackground">Scale: {chord.collection_info.scale_name}</span></h4> 
                                <h4 style={{margin: "20px"}}><span className="textBackground">Notes: {noteArray.toString()}</span></h4>
                                <h4><span className="textBackground">Date: {chord.collection_info.created_at.slice(0,10)}</span></h4>
                                <br></br>
                                <button className={"niceButton"} onClick={() => this.handlePlayClick(notesToPlay)}>Play</button>
                                <button className={"niceButton"} onClick={() => this.handleDelete(chord.collection_info.id)}>Delete</button>
                            </div>
                            <div className="col-6" style={{left: "-70px", top: "25px"}}>
                                <div className="textBackground" style={{padding: "20px"}}>
                                    <h3>Add to a chord progression</h3>
                                    <br></br>
                                    <button className="niceButton" onClick={() => this.addChordToProgression(chord.collection_info.id, 1)}>1</button>                              
                                    <button className="niceButton" onClick={() => this.addChordToProgression(chord.collection_info.id, 2)}>2</button>                                        
                                    <button className="niceButton" onClick={() => this.addChordToProgression(chord.collection_info.id, 3)}>3</button>                    
                                    <button className="niceButton" onClick={() => this.addChordToProgression(chord.collection_info.id, 4)}>4</button>
                                </div>                                           
                            </div>
                        </div>
                        <br></br><br></br>
                        </li>
                    })
            }else{
                return <div>
                    <br></br>
                    <h4 style={{position: "relative", left: "-20px"}}>You haven't saved any chords.</h4>
                </div>
            }
        }
    }

    render(){
        return(
            <div>
                <br></br>
                <div>
                    <h1>{`${this.props.user.user.username}'s Chords`}</h1>
                    <ul style={{ position: "relative", margin: "auto", top: "-20px"}}>{this.renderChords()}</ul>
                </div>
            </div>
        )
    }
}

