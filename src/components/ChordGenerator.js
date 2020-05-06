import React from 'react'
import { api } from '../services/api'
import { PolySynth, Synth } from 'tone'
import Piano from './Piano'
import 'bootstrap/dist/css/bootstrap.min.css';

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
            octaveTwoNotes: [],
            hasBeenSaved: false
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
            let staticNotesInScale;
            let octaveTwo;
            api.collections.getNotesInCollection(this.state.currentScale.id)
            .then(res => {
                notesInScale = res.notes.map((note)=>{
                    return note.name
                })
                //static notes wont console.log??
                staticNotesInScale = res.notes.map((note)=>{
                    return note.name
                })
                this.setState({
                    currentScaleNotes: notesInScale
                })
                octaveTwo = res.notes.map((note)=>{
                    return note.name
                })
                // octaveTwo = res.notes.map((note)=>{
                //     return note.name
                // })
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
                        // if(indexOf(noteToAdd) === notesInScale.length + 1 
                        //     && notesInScale[0] === allNotes[allNotes.indexOf(noteToAdd) + 1]){
                        //         notesInScale.splice(0, 1)
                        // }
                        // if(indexOf(noteToAdd) === notesInScale.length + 1 && notesInScale[0] === allNotes[0]){
                        //     notesInScale.splice(0,1)
                        // }
                        

                        if(noteToAdd === "G#" && notesInScale.includes("A")){
                            notesInScale.splice(notesInScale.indexOf("A"), 1)
                        }
                        if(noteToAdd === "A" && notesInScale.includes("G#")){
                            notesInScale.splice(notesInScale.indexOf("G#"), 1)
                        }
                        
                        notesInScale.splice(notesInScale.indexOf(noteToAdd), 1)
                        console.log(`notesinscale: ${notesInScale}`)
                        
                    }else{
                        let randomIndexOc2 = Math.floor(Math.random() * octaveTwo.length) 
                        console.log(`static: ${staticNotesInScale}`)
                        console.log(`oct2 ${octaveTwo}`)


                        if(chord.includes(`${staticNotesInScale[staticNotesInScale.length -1]}3`)){
                            let lastNote = staticNotesInScale[staticNotesInScale.length -1]
                            console.log(`includes last note:${lastNote}`)
                            if(staticNotesInScale[0] === allNotes[allNotes.indexOf(lastNote)+1]){
                                if(octaveTwo.includes(staticNotesInScale[0])){
                                    octaveTwo.splice(0, 1)
                                    console.log("first removed")
                                    randomIndexOc2 = Math.floor(Math.random() * octaveTwo.length)
                                }
                            }
                        }


                        let noteToAdd = octaveTwo[randomIndexOc2]
                        console.log(` note to add :${noteToAdd}`)
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
                        // fix: if chord contains last item of staticNotesinScale and the first item in staticNotes is a semitone away from the last, remove the first item
                        if(noteToAdd === "G#" && octaveTwo.includes("A")){
                            octaveTwo.splice(octaveTwo.indexOf("A"), 1)
                        }
                        if(noteToAdd === "A" && octaveTwo.includes("G#")){
                            octaveTwo.splice(octaveTwo.indexOf("G#"), 1)
                        }

                        octaveTwo.splice(octaveTwo.indexOf(noteToAdd), 1)
                    }             
                }  
                console.log(chord) 
                this.setState({
                    currentChord: chord,
                    hasBeenGenerated: true,
                    hasBeenSaved: false
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
        polySynth.triggerAttackRelease(this.state.currentChord, '2.5');
    }

    handleSave = () => {
        if(!this.state.hasBeenSaved && !!this.props.user.id){
            let octaveTwoConfigured = this.state.octaveTwoNotes.map(note => {
                return `${note}2`
            })
            this.setState({
                hasBeenSaved: true
            },() => {
                this.props.saveChord({octave_one: this.state.octaveOneNotes, octave_two: octaveTwoConfigured}, this.state.currentScale.scale_name)
            })
        }
        
    }

    render(){
        return(
            <div>
                <br></br>
                <h1>Chord Generator</h1>
                <br></br>
                    <div className="container-fluid">
                    <div className="row" style={{height: '120px'}}>
                        <div className="col-3"></div>
                        <div className="col-2">
                            <label className="formLabel">Scale</label><br></br>
                            <select className="formSelect" style={{width: "160px"}} id="chord-scale" onChange={(event) => this.onScaleChange(event)}>
                                <option value="Major">Major</option>
                                <option value="Minor">Minor</option>
                                <option value="Major Pentatonic">Major Pentatonic</option>
                                <option value="Minor Pentatonic">Minor Pentatonic</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <label className="formLabel">Key</label><br></br>
                            <select className="formSelect" id="chord-key" onChange={event => this.onKeyChange(event)}>
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
                            </select>
                        </div>
                        <div className="col-2">
                            <label className="formLabel">Number of Notes</label><br></br>
                            <select className="formSelect" id="note-num" onChange={event => this.onNoteNumChange(event)}>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </select>
                        </div>
                        <div className="col-3"></div>
                    </div>  
                    </div>     
                <button className={"niceButton"} onClick={this.onGenerate}>Generate</button>
                {!!this.state.hasBeenGenerated ? <button className={"niceButton"} onClick={this.onPlay}>Play</button>: null}
                {!!this.state.hasBeenGenerated && !!this.props.user.id ? <button className={"niceButton"} onClick={this.handleSave}>{!!this.state.hasBeenSaved ? "Saved" : "Save"}</button>: null}
                <br></br>
                {!!this.state.hasBeenGenerated ? <Piano octaveOne={this.state.octaveOneNotes} octaveTwo={this.state.octaveTwoNotes} scaleKey={this.state.key}></Piano>
                : <Piano octaveOne={[]} octaveTwo={[]} scaleKey={"C"}></Piano>}
            </div>
        )
    }
}