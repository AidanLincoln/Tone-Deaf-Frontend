import React from 'react'
import { api } from '../services/api'

export default class ChordGenerator extends React.Component {
    constructor(){
        super()
        this.state = {
            scaleType: "Major",
            key: "C",
            numberOfNotes: 3,
            currentScale: null,
            currentChord: null,
            hasBeenGenerated: false

        }
    }

    onScaleChange = (event) => {
        this.setState({
            scaleType: event.target.value
        })
    }

    onKeyChange = (event) => {
        this.setState({
            key: event.target.value
        })
    }

    onNoteNumChange = (event) => {
        this.setState({
            numberOfNotes: event.target.value
        })
    }

    onGenerate = () => {
        let genScale;
        this.props.allScales.forEach((scale) => {
            if(scale.scale_name === `${this.state.key} ${this.state.scaleType}`){
                genScale = scale
            }
        })
        this.setState({
            currentScale: genScale
        },()=> {
            let notesInScale;
            api.collections.getNotesInCollection(this.state.currentScale.id)
            .then(res => {
                notesInScale = res.notes.map((note)=>{
                    return note.name
                })
                console.log(notesInScale)
                let chord = []
                const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E','F', 'F#', 'G', 'G#']
                while(chord.length < this.state.numberOfNotes){
                    //need to remove notes that are a semitone apart
                    //if numofnotes > 5 add second octave
                    //if numofnotes == 5, choose one note in upper octave
                    //if numberOfNotes == 6, choose 2 notes in second octave. if 7, choose 3
                    let randomIndex = Math.floor(Math.random() * notesInScale.length)  
                    chord.push(notesInScale[randomIndex])
                    if(notesInScale.includes(allNotes[allNotes.indexOf(notesInScale[randomIndex])-1])){
                        notesInScale.splice(notesInScale.indexOf(allNotes[allNotes.indexOf(notesInScale[randomIndex])-1]), 1)
                    }
                    if(notesInScale.includes(allNotes[allNotes.indexOf(notesInScale[randomIndex])+1])){
                        notesInScale.splice(notesInScale.indexOf(allNotes[allNotes.indexOf(notesInScale[randomIndex])+1]), 1)
                    }
                    notesInScale.splice(randomIndex, 1)
                    console.log(notesInScale)
                    console.log(chord)  
                    this.setState({
                        currentChord: chord,
                        hasBeenGenerated: true
                    })                
                }         
            })
        })
    }
    onPlay

    render(){
        return(
            <div>
                <label>Scale</label>
                <select id="chord-scale" onChange={(event) => this.onScaleChange(event)}>
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                    <option value="Major Pentatonic">Major Pentatonic</option>
                    <option value="Minor Pentatonic">Minor Pentatonic</option>
                </select><br></br><br></br>

                <label>Key</label>
                <select id="chord-key" onChange={event => this.onKeyChange(event)}>
                    <option value="C">C</option>
                    <option value="C#">C#</option>
                    <option value="D">D</option>
                    <option value="D#">D#</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="F#">F#</option>
                    <option value="G">G</option>
                    <option value="G#">G#</option>
                    <option value="A">A</option>
                    <option value="A#">A#</option>
                    <option value="B">B</option>
                </select><br></br><br></br>

                <label>Number of Notes</label>
                <select id="note-num" onChange={event => this.onNoteNumChange(event)}>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select><br></br><br></br>

                <button onClick={this.onGenerate}>Generate</button>
                {!!this.state.hasBeenGenerated ? <button onClick={this.onPlay}>Play</button>: null}
            </div>
        )
    }
}