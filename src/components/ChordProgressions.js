import React from 'react'
import { api } from '../services/api'
import { PolySynth, Synth } from 'tone'
import Piano from './Piano'
import 'bootstrap/dist/css/bootstrap.min.css';

const polySynth = new PolySynth({
    polyphony: 8,
    volume : -7 ,
    detune : 0 ,
    voice : Synth
}).toMaster();

export default class ChordProgressions extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentProgression: 1
        }
    }

    renderChordProgression = () => {
        if(!!this.props.usersChords){
            let chordsInProgression = this.props.usersChords.filter((chord) => {
                return chord.collection_info.chord_progression === this.state.currentProgression
            })
            console.log(chordsInProgression)
            if(chordsInProgression.length > 0){
                return chordsInProgression.map(chord => {
                    let notesInChord = chord.collection_notes.map(note => {
                        return note.name
                    })
                    let notesToDisplay = this.props.sortNotes(notesInChord).join(', ')
                    return <li className="chordLi">
                        <h4>Scale: {chord.collection_info.scale_name}</h4>
                        <h4>Notes: {notesToDisplay}</h4>
                        <button className="niceButton" onClick={(event) => this.playChord(notesInChord)}>Play</button>
                        <button className="niceButton" onClick={() => this.removeFromProgression(chord.collection_info.id)}>Remove from Progression</button>
                        <br></br><br></br>
                    </li>
                })
            }else{
                return <h4>This progression has no chords.</h4>
            }
        }
    }

    progressionHasChords = () => {
        if(this.props.usersChords){
            let progression = this.props.usersChords.filter((chord) => {
                return chord.collection_info.chord_progression === this.state.currentProgression
            })
            if(progression.length > 0){
                return true
            }else{
                return false
            }
        }
    }
    componentDidMount(){
        this.props.updateUsersChords()
    }

    removeFromProgression = (collectionId) => {
        api.collections.addChordToProgression(collectionId, null)
        .then((res) => {
            console.log(res)
        })
        .then(() => {
            this.props.updateUsersChords()
        })
    }
    
    handleProgressionChange = (progressionNum) => {
        this.setState({
            currentProgression: progressionNum
        })
    }

    playChordProgression = (event) => {
        event.preventDefault()
        if(!!this.props.usersChords){ 
            let chordsNotesArray = []
            this.props.usersChords.filter((chord) => {
                return chord.collection_info.chord_progression === this.state.currentProgression
            }).forEach((chord) => {
                let notes = []
                chord.collection_notes.forEach((note) => {
                    if(note.name.includes("2")){
                        notes.push(`${note.name.substring(0, note.name.length - 1)}4`)
                    }else(notes.push(`${note.name}3`))
                    
                })
                chordsNotesArray.push(notes)
            })
            console.log(chordsNotesArray)
            chordsNotesArray.forEach((noteSet, i) => {      
                setTimeout(() => {
                    polySynth.triggerAttackRelease(noteSet, '2.5');
                }, i * 2600);
            })
        }
    }

    playChord = (notes) => {
        let notesToPlay = []
        notes.forEach((note) => {
            if(note.includes("2")){
                notesToPlay.push(`${note.substring(0, note.length - 1)}4`)
            }else(notesToPlay.push(`${note}3`))
            
        })
        polySynth.triggerAttackRelease(notesToPlay, '2.5');
    }

    render(){
        return(
            <div>
                <br></br>
                <h1>Chord Progressions</h1>
                <br></br>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-2">
                            <button className="niceButton" 
                                style={this.state.currentProgression === 1 ? {backgroundColor: "white", color: "black"} : null}
                                onClick={() => this.handleProgressionChange(1)}>
                                Progression 1
                            </button>
                        </div>
                        <div className="col-2">
                            <button className="niceButton" 
                                style={this.state.currentProgression === 2 ? {backgroundColor: "white", color: "black"} : null}
                                onClick={() => this.handleProgressionChange(2)}>
                                Progression 2
                            </button>
                        </div>
                        <div className="col-2">
                            <button className="niceButton" 
                                style={this.state.currentProgression === 3 ? {backgroundColor: "white", color: "black"} : null}
                                onClick={() => this.handleProgressionChange(3)}>
                                Progression 3
                            </button>
                        </div>
                        <div className="col-2">
                            <button className="niceButton" 
                                style={this.state.currentProgression === 4 ? {backgroundColor: "white", color: "black"} : null}
                                onClick={() => this.handleProgressionChange(4)}>
                                Progression 4
                            </button>
                        </div>

                        <div className="col-2"></div>
                    </div>
                </div>
                {this.progressionHasChords() ? 
                <button className="niceButton" style={{position: "relative", top: "-105px"}} onClick={(event) => this.playChordProgression(event)}>Play Chord Progression</button> 
                : null}<br></br><br></br>
                <ul style={{position: "relative", top: "-100px", left: "-20px"}}>
                    {this.renderChordProgression()}
                </ul>
            </div>
        )
    }
}