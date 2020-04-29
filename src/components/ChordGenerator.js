import React from 'react'
import { api } from '../services/api'
import { PolySynth, Synth } from 'tone'
import Piano from './Piano'
export default class ChordGenerator extends React.Component {
    constructor(){
        super()
        this.state = {
            scaleType: "Major",
            key: "C",
            numberOfNotes: 3,
            currentScale: null,
            currentScaleNotes: null,
            currentChord: null,
            hasBeenGenerated: false,
            octaveOneNotes: [],
            octaveTwoNotes: []

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
            currentScale: genScale,
            octaveOneNotes: [],
            octaveTwoNotes: []
        },()=> {
            let notesInScale;
            let octaveTwo;
            api.collections.getNotesInCollection(this.state.currentScale.id)
            .then(res => {
                notesInScale = res.notes.map((note)=>{
                    return note.name
                })
                this.setState({
                    currentScaleNotes: notesInScale
                })
                octaveTwo = res.notes.map((note)=>{
                    return note.name
                })
                let chord = []
                const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E','F', 'F#', 'G', 'G#']
                while(chord.length < this.state.numberOfNotes){
                    ///make a 50/50 chance of starting on creating upper octave first?
                    if(chord.length < 4){
                        let randomIndex = Math.floor(Math.random() * notesInScale.length) 
                        let noteToAdd = notesInScale[randomIndex]
                        this.setState((prevState) => ({
                            octaveOneNotes: [...prevState.octaveOneNotes, noteToAdd]
                        }))
                        chord.push(`${noteToAdd}3`)
                        if(notesInScale.includes(allNotes[allNotes.indexOf(noteToAdd)-1])){
                            notesInScale.splice(notesInScale.indexOf(allNotes[allNotes.indexOf(noteToAdd)-1]), 1)
                        }
                        if(notesInScale.includes(allNotes[allNotes.indexOf(noteToAdd)+1])){
                            notesInScale.splice(notesInScale.indexOf(allNotes[allNotes.indexOf(noteToAdd)+1]), 1)
                        }
                        //if note is a G#, it cant remove an A... Must force

                        if(noteToAdd === "G#" && notesInScale.includes("A")){
                            notesInScale.splice(notesInScale.indexOf("A"), 1)
                        }
                        if(noteToAdd === "A" && notesInScale.includes("G#")){
                            notesInScale.splice(notesInScale.indexOf("G#"), 1)
                        }
                        
                        notesInScale.splice(notesInScale.indexOf(noteToAdd), 1)
                        
                    }else{
                        let randomIndexOc2 = Math.floor(Math.random() * octaveTwo.length) 
                        let noteToAdd = octaveTwo[randomIndexOc2]
                        this.setState((prevState) => ({
                            octaveTwoNotes: [...prevState.octaveTwoNotes, noteToAdd]
                        }))
                        chord.push(`${noteToAdd}4`)
                        if(octaveTwo.includes(allNotes[allNotes.indexOf(noteToAdd)-1])){
                            octaveTwo.splice(octaveTwo.indexOf(allNotes[allNotes.indexOf(noteToAdd)-1]), 1)
                        }
                        if(octaveTwo.includes(allNotes[allNotes.indexOf(octaveTwo[randomIndexOc2])+1])){
                            octaveTwo.splice(octaveTwo.indexOf(allNotes[allNotes.indexOf(noteToAdd)+1]), 1)
                        }
                        //force remove G# || A
                        if(noteToAdd === "G#" && notesInScale.includes("A")){
                            notesInScale.splice(notesInScale.indexOf("A"), 1)
                        }
                        if(noteToAdd === "A" && notesInScale.includes("G#")){
                            notesInScale.splice(notesInScale.indexOf("G#"), 1)
                        }

                        octaveTwo.splice(octaveTwo.indexOf(noteToAdd), 1)
                    }             
                }  
                console.log(chord) 
                this.setState({
                    currentChord: chord,
                    hasBeenGenerated: true
                })           
            })
        })
    }

    onPlay = (event) => {
        event.preventDefault()
        const polySynth = new PolySynth({
            polyphony: 8,
            volume : -7 ,
            detune : 0 ,
            voice : Synth
            }).toMaster();
        console.log(`playing: ${this.state.currentChord}`)
        polySynth.triggerAttackRelease(this.state.currentChord, "2.8");
    }

    handleSave = () => {
        let octaveTwoConfigured = this.state.octaveTwoNotes.map(note => {
            return `${note}2`
        })
        this.props.saveChord({octave_one: this.state.octaveOneNotes, octave_two: octaveTwoConfigured}, this.state.currentScale.scale_name)
    }

    render(){
        return(
            <div>
                <br></br><br></br>
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
                {!!this.state.hasBeenGenerated ? <button onClick={this.handleSave}>Save</button>: null}

                <br></br><br></br>
                {!!this.state.hasBeenGenerated ? <Piano octaveOne={this.state.octaveOneNotes} octaveTwo={this.state.octaveTwoNotes} scaleKey={this.state.key}></Piano>: null}
            </div>
        )
    }
}