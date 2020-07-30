import React from 'react'
import { PolySynth, Synth } from 'tone'

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
            }
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
            return <div className="col-1" onClick={() => this.playNote(note, octave)}
                style={{border: "5px solid #ff5757", padding: '20px', backgroundColor: colorObj[note], color: colorObj[note] === "white" ? "black" : "white"}}
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
            return <div className="col-1" onClick={() => this.playNote(note, octave)}
                style={{border: "5px solid #ff5757", padding: '20px', backgroundColor: colorObj[noteOc], color: colorObj[noteOc] === "white" ? "black" : "white"}}
                key={note}>{note}
            </div>
        })
    }

    mapOc1 = () => {
        const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

        return notes.map((note, index) => {
            return <div className="col-1" onClick={() => this.keyClick(note)}
            style={{border: "5px solid #ff5757", padding: '20px', backgroundColor: "#ffde59", opacity: this.state.activeKeys[note] === false ? "0.5" : "1"}}
            key={note}>
            </div>
        }) 
    }

    mapOc2 = () => {
        const notes = ["C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2"]

        return notes.map((note, index) => {
            return <div className="col-1" onClick={() => this.keyClick(note)}
            style={{border: "5px solid #ff5757", padding: '20px', backgroundColor: "#ffde59", opacity: this.state.activeKeys[note] === false ? "0.5" : "1"}}
            key={note}>
            </div>
        })
    }

    keyClick = (note) => {
        let newObj = this.state.activeKeys
        newObj[note] = !newObj[note]
        this.setState({activeKeys: newObj})
    }

    playNote = (note, octave) => {
        const polySynth = new PolySynth({
            polyphony: 8,
            volume : -7 ,
            detune : 0 ,
            voice : Synth
        }).toMaster();

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
            const polySynth = new PolySynth({
                polyphony: 8,
                volume : -7 ,
                detune : 0 ,
                voice : Synth
            }).toMaster();

            polySynth.triggerAttackRelease(chord, '2.5');
        }
    }

    render(){
        return(
            <div style={{marginTop: "20px"}}>   
            <br></br>
            <h1 className='pageTitle'>Chord Creator</h1>
                <br></br>
                <div>
                    <button className={"niceButton"} onClick={this.onPlayChord}>Play</button>
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
