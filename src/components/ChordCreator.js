import React from 'react'
import { Tone, PolySynth, Synth } from 'tone'
import { api } from '../services/api'

const polySynth = new PolySynth({
    polyphony: 8,
    volume : -7 ,
    detune : 0 ,
    voice : Synth
}).toMaster();
polySynth.set({
	"envelope" : {
        "attack" : 0.005,
	}
});

export default class ChordCreator extends React.Component {
    constructor(){
        super()
        this.state = {
            activeKeys: {
                'C': false,
                'C#': false,
                'D': false,
                'D#': false,
                'E': false,
                'F': false,
                'F#': false,
                'G': false,
                'G#': false,
                'A': false,
                'A#': false,
                'B': false,
                'C2': false,
                'C#2': false,
                'D2': false,
                'D#2': false,
                'E2': false,
                'F2': false,
                'F#2': false,
                'G2': false,
                'G#2': false,
                'A2': false,
                'A#2': false,
                'B2': false
            },
            hasBeenSaved: false
        }
    }

    orderKeys = () => {
        const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
        let notesToDisplay = []
        let i = 0
        while(notesToDisplay.length < 12){
            if(i < allNotes.length){
                notesToDisplay.push(allNotes[i])
            }else{
                i = 0
                notesToDisplay.push(allNotes[i])
            }
            i += 1
        }
        return notesToDisplay
    }

    mapScaleToKeysOc1 = () => {
        const colorObj = {
            'C': 'white',
            'C#': 'black',
            'D': 'white',
            'D#': 'black',
            'E': 'white',
            'F': 'white',
            'F#': 'black',
            'G': 'white',
            'G#': 'black',
            'A': 'white',
            'A#': 'black',
            'B': 'white'
        }   
        return this.orderKeys().map((note, index) => {
            let octave = 1
            return <div className="pianoKey col-1" onClick={() => this.playNote(note, octave)}
                style={{border: "3px solid #ff5757", padding: '20px', backgroundColor: colorObj[note], color: colorObj[note] === "white" ? "black" : "white", background: colorObj[note] === "black" ? "linear-gradient(to bottom, black 65%, white 35%" : "linear-gradient(to bottom, white 50%, white 50%"}}
                key={index}>{note}
            </div>
        })
    }

    mapScaleToKeysOc2 = () => {
        const colorObj = {
            'C2': 'white',
            'C#2': 'black',
            'D2': 'white',
            'D#2': 'black',
            'E2': 'white',
            'F2': 'white',
            'F#2': 'black',
            'G2': 'white',
            'G#2': 'black',
            'A2': 'white',
            'A#2': 'black',
            'B2': 'white'
        }   
        return this.orderKeys().map((note, index) => {
            let octave = 2
            let noteOc = `${note}2`
            return <div className="pianoKey col-1" onClick={() => this.playNote(note, octave)}
                style={{border: "3px solid #ff5757", padding: '20px', color: colorObj[noteOc] === "white" ? "black" : "white", background: colorObj[noteOc] === "black" ? "linear-gradient(to bottom, black 65%, white 35%" : "linear-gradient(to bottom, white 50%, white 50%"}}
                key={note}>{note}
            </div>
        })
    }

    mapOc1 = () => {
        const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

        return notes.map((note, index) => {
            return <div className="pianoKey col-1" onClick={() => this.noteToggle(note)}
            style={{border: "3px solid #ff5757", padding: '20px', backgroundColor: this.state.activeKeys[note] === false ? "#FFAD6D" : "#ffde59"}}
            key={note}>
            </div>
        }) 
    }

    mapOc2 = () => {
        const notes = ["C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2"]

        return notes.map((note, index) => {
            return <div className="pianoKey col-1" onClick={() => this.noteToggle(note)}
            style={{border: "3px solid #ff5757", padding: '20px', backgroundColor: this.state.activeKeys[note] === false ? "#FFAD6D" : "#ffde59"}}
            key={note}>
            </div>
        })
    }

    noteToggle = (note) => {
        let newObj = this.state.activeKeys
        let noteToPlay = ''
        if(note.includes('2')){
            noteToPlay = `${note.slice(0, -1)}4`
        }else{
            noteToPlay = `${note}3`
        }
        if(newObj[note] === false){
            polySynth.triggerAttackRelease(noteToPlay, '0.5');
        }
        newObj[note] = !newObj[note]
        this.setState({activeKeys: newObj, hasBeenSaved: false})
    }

    playNote = (note, octave) => {
        let noteToPlay = `${note}${octave + 2}`
        polySynth.triggerAttackRelease(noteToPlay, '0.5');
    }

    onPlayChord = () => {
        let activeKeys = Object.keys(this.state.activeKeys)
        let chord = []
        activeKeys.forEach((key) => {
            if(this.state.activeKeys[key] === true){
                if(key.includes('2')){
                    chord.push(`${key.slice(0, -1)}4`)
                }else{
                    chord.push(`${key}3`)
                }
            }
        })
        if(chord.length){
            polySynth.triggerAttackRelease(chord, '2.5');
        }
    }
    onResetPiano = () => {
        this.setState({
            activeKeys: {
                'C': false,
                'C#': false,
                'D': false,
                'D#': false,
                'E': false,
                'F': false,
                'F#': false,
                'G': false,
                'G#': false,
                'A': false,
                'A#': false,
                'B': false,
                'C2': false,
                'C#2': false,
                'D2': false,
                'D#2': false,
                'E2': false,
                'F2': false,
                'F#2': false,
                'G2': false,
                'G#2': false,
                'A2': false,
                'A#2': false,
                'B2': false
            },
            hasBeenSaved: false
        })
    }

    stopChord = () => {
        
    }

    handleSave = () => {
        let activeKeys = Object.keys(this.state.activeKeys)
        let chord = {
            octave_one: [],
            octave_two: []
        }
        let chordArray = []
        activeKeys.forEach((key) => {
            if(this.state.activeKeys[key] === true){
                if(key.includes('2')){
                    chord.octave_two.push(key)
                    chordArray.push(key.slice(0, -1))
                }else{
                    chord.octave_one.push(key)
                    chordArray.push(key)
                }
            }
        })
        let detectedScale = this.detectScale(chordArray)
        if((!!chord.octave_one.length || !!chord.octave_two.length) && !!this.props.user.id){
            this.props.saveChord(chord, detectedScale)
            console.log("saved")
            this.setState({hasBeenSaved: true})
        }
    }

    detectScale = (notes) => {
        let detectedScale = "Unknown"
        const scaleList = this.props.allScales
        console.log(scaleList)
        let array = [] 
        
        const scaleNoteArray = [["C","D","E","F","G","A","B"],["C#","D#","F","F#","G#","A#","C"],["D","E","F#","G","A","B","C#"],["D#","F","G","G#","A#","C","D"],["E","F#","G#","A","B","C#","D#"],["F","G","A","A#","C","D","E"],["F#","G#","A#","B","C#","D#","F"],["G","A","B","C","D","E","F#"],["G#","A#","C","C#","D#","F","G"],["A","B","C#","D","E","F#","G#"],["A#","C","D","D#","F","G","A"],["B","C#","D#","E","F#","G#","A#"],["C","D","D#","F","G","G#","A#"],["C#","D#","E","F#","G#","A","B"],["D","E","F","G","A","A#","C"],["D#","F","F#","G#","A#","B","C#"],["E","F#","G","A","B","C","D"],["F","G","G#","A#","C","C#","D#"],["F#","G#","A","B","C#","D","E"],["G","A","A#","C","D","D#","F"],["G#","A#","B","C#","D#","E","F#"],["A","B","C","D","E","F","G"],["A#","C","C#","D#","F","F#","G#"],["B","C#","D","E","F#","G","A"],["C","D#","F","G","A#"],["C#","E","F#","G#","B"],["D","F","G","A","C"],["D#","F#","G#","A#","C#"],["E","G","A","B","D"],["F","G#","A#","C","D#"],["F#","A","B","C#","E"],["G","A#","C","D","F"],["G#","B","C#","D#","F#"],["A","C","D","E","G"],["A#","C#","D#","F","G#"],["B","D","E","F#","A"],["C","D","E","G","A"],["C#","D#","F","G#","A#"],["D","E","F#","A","B"],["D#","F","G","A#","C"],["E","F#","G#","B","C#"],["F","G","A","C","D"],["F#","G#","A#","C#","D#"],["G","A","B","D","E"],["G#","A#","C","D#","F"],["A","B","C#","E","F#"],["A#","C","D","F","G"],["B","C#","D#","F#","G#"]]
    
        for(let i = 0; i < scaleList.length; i++){
            if(notes.every(val => scaleNoteArray[i].includes(val))){
                console.log(scaleList)
                console.log(notes)
                console.log(scaleNoteArray[i])
                detectedScale = scaleList[i].scale_name
                break
            }
        }       
        return detectedScale
    }

    render(){
        return(
            <div style={{marginTop: "20px"}}>   
            <br></br>
            <h1 className='pageTitle'>Chord Creator</h1>
                <br></br><br></br>
                <div>
                    <button className={"niceButton"} onClick={this.onPlayChord}>Play</button>
        {!!this.props.user.id ? <button className={"niceButton"} onClick={this.handleSave}>{!!this.state.hasBeenSaved ? "Saved" : "Save"}</button> : null}
                    <button className={"niceButton"} onClick={this.onResetPiano}>Reset Piano</button>
                    <button className="niceButton" onClick={this.stopChord}>Stop</button>
                </div>
                <div className="container-fluid">       
                    <div className="row" style={{padding: "40px", paddingLeft:"60px", paddingRight:"60px"}}>
                        <div className="col-6">
                            <div className="row pianoTL">
                                {this.mapScaleToKeysOc1()}
                            </div>
                            <div className="row pianoBL" style={{marginTop: "0px"}}>
                                {this.mapOc1()}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row pianoTR">
                                {this.mapScaleToKeysOc2()}
                            </div>
                            <div className="row pianoBR" style={{marginTop: "0px"}}>
                                {this.mapOc2()}            
                            </div>
                        </div>
                    </div>   
                </div>         
            </div>
        )
    }
}
