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
            hasBeenSaved: false,
            genAlgo: "classic"
        }
    }

    onAlgoChange = (event) => {
        this.setState({
            genAlgo: event.target.value
        })
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
        console.log("Creating chord with jazz generation algorithm")
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
                staticNotesInScale = res.notes.map((note)=>{
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
                        if(noteToAdd === "G#" && notesInScale.includes("A")){
                            notesInScale.splice(notesInScale.indexOf("A"), 1)
                        }
                        if(noteToAdd === "A" && notesInScale.includes("G#")){
                            notesInScale.splice(notesInScale.indexOf("G#"), 1)
                        }      
                        if(noteToAdd === "G#" && octaveTwo.includes("A")){
                            octaveTwo.splice(octaveTwo.indexOf("A"), 1)
                        }    
                        if(noteToAdd === "A#" && octaveTwo.includes("B")){
                            octaveTwo.splice(octaveTwo.indexOf("B"), 1)
                        }      
                        notesInScale.splice(notesInScale.indexOf(noteToAdd), 1)
                    }else{
                        let randomIndexOc2 = Math.floor(Math.random() * octaveTwo.length) 
                        if(chord.includes(`${staticNotesInScale[staticNotesInScale.length -1]}3`)){
                            let lastNote = staticNotesInScale[staticNotesInScale.length -1]
                            if(staticNotesInScale[0] === allNotes[allNotes.indexOf(lastNote)+1]){
                                if(octaveTwo.includes(staticNotesInScale[0])){
                                    octaveTwo.splice(0, 1)
                                    randomIndexOc2 = Math.floor(Math.random() * octaveTwo.length)
                                }
                            }
                        }
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

    onGenerate2 = () => {
        console.log("Creating chord with normal generation algorithm")
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
                staticNotesInScale = res.notes.map((note)=>{
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
                        if(noteToAdd === "G#" && notesInScale.includes("A")){
                            notesInScale.splice(notesInScale.indexOf("A"), 1)
                        }
                        if(noteToAdd === "A" && notesInScale.includes("G#")){
                            notesInScale.splice(notesInScale.indexOf("G#"), 1)
                        }      
                        if(noteToAdd === "G#" && octaveTwo.includes("A")){
                            octaveTwo.splice(octaveTwo.indexOf("A"), 1)
                        }    
                        if(noteToAdd === "A#" && octaveTwo.includes("B")){
                            octaveTwo.splice(octaveTwo.indexOf("B"), 1)
                        }      
                        notesInScale.splice(notesInScale.indexOf(noteToAdd), 1)
                    }else{
                        // remove all notes from oc2 that are a semitone apart from any of the chord notes
                        octaveTwo.forEach((note) => {
                            chord.forEach(chordNote => {
                                if(octaveTwo.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 1])){
                                    octaveTwo.splice(octaveTwo.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 1]), 1)
                                }
                                if(octaveTwo.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 1])){
                                    octaveTwo.splice(octaveTwo.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 1]), 1)
                                }
                            })
                        })
                        let randomIndexOc2 = Math.floor(Math.random() * octaveTwo.length) 
                        if(chord.includes(`${staticNotesInScale[staticNotesInScale.length -1]}3`)){
                            let lastNote = staticNotesInScale[staticNotesInScale.length -1]
                            if(staticNotesInScale[0] === allNotes[allNotes.indexOf(lastNote)+1]){
                                if(octaveTwo.includes(staticNotesInScale[0])){
                                    octaveTwo.splice(0, 1)
                                    randomIndexOc2 = Math.floor(Math.random() * octaveTwo.length)
                                }
                            }
                        }
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
    // developing new generation algo
    onGenerate3 = () => {
        console.log("Creating chord with NEW generation algorithm")
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
                staticNotesInScale = res.notes.map((note)=>{
                    return note.name
                })
                this.setState({
                    currentScaleNotes: notesInScale
                })
                octaveTwo = res.notes.map((note)=>{
                    return note.name
                })
                let chord = []
                const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
                while(chord.length < this.state.numberOfNotes){
                   //on every iteration a random octave between 1 or 2 should be picked, and a random index of that array should also be picked
                   let randomOctave = Math.floor(Math.random() * 2) + 1 
                   if(randomOctave === 1 && !notesInScale.length){
                       randomOctave = 2
                   }
                   if(randomOctave === 2 && !octaveTwo.length){
                    randomOctave = 1
                }
                   let randomIndex;
                   if(randomOctave === 1){
                    notesInScale.forEach((note) => {
                        chord.forEach(chordNote => {
                            if(notesInScale.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 1])){
                                notesInScale.splice(notesInScale.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 1]), 1)
                            }
                            if(notesInScale.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 1])){
                                notesInScale.splice(notesInScale.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 1]), 1)
                            }
                        })
                       
                        //if chord contains G#, remove A from notesInScale... vice versa
                        
                        if(chord.includes("G#3") && notesInScale.includes("A")){
                            notesInScale.splice(notesInScale.indexOf("A"), 1)
                        }
                        if(chord.includes("A3") && notesInScale.includes("G#")){
                            notesInScale.splice(notesInScale.indexOf("G#"), 1)
                        }
                    })
                    randomIndex = Math.floor(Math.random() * notesInScale.length)
                    let noteToAdd = notesInScale[randomIndex]
                        this.setState((prevState) => ({
                            octaveOneNotes: [...prevState.octaveOneNotes, noteToAdd]
                        }))
                   chord.push(`${noteToAdd}3`)
        
                   notesInScale.splice(randomIndex, 1)
                   }
                   if(randomOctave === 2){
                    
                    //remove notes from octave two that are a semitone apart from any notes in the chord

                        octaveTwo.forEach((note) => {
                            chord.forEach(chordNote => {
                                if(octaveTwo.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 1])){
                                    octaveTwo.splice(octaveTwo.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 1]), 1)
                                }
                                if(octaveTwo.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 1])){
                                    octaveTwo.splice(octaveTwo.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 1]), 1)
                                }
                            })
                            //if chord contains G#, remove A from octave two
                        
                            if(chord.includes("G#4") && octaveTwo.includes("A")){
                                octaveTwo.splice(octaveTwo.indexOf("A"), 1)
                            }
                            if(chord.includes("A4") && octaveTwo.includes("G#")){
                                octaveTwo.splice(octaveTwo.indexOf("G#"), 1)
                            }
                        })
                        randomIndex = Math.floor(Math.random() * octaveTwo.length)
                        let noteToAdd = octaveTwo[randomIndex]
                        this.setState((prevState) => ({
                            octaveTwoNotes: [...prevState.octaveTwoNotes, noteToAdd]
                        }))
                        chord.push(`${noteToAdd}4`)
                        
                        octaveTwo.splice(randomIndex, 1)
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
    //begin writing new generation algorithm that doesnt allow notes to be 2 semitones apart
    //allow a certain amount of notes to be 2 semitones apart, potentially 1 or 2?
    onGenerate4 = () => {
        console.log("Creating chord with NEWEST generation algorithm")
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
                staticNotesInScale = res.notes.map((note)=>{
                    return note.name
                })
                this.setState({
                    currentScaleNotes: notesInScale
                })
                octaveTwo = res.notes.map((note)=>{
                    return note.name
                })
                let chord = []
                const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
                console.log(...notesInScale)
                console.log(...octaveTwo)
                while(chord.length < this.state.numberOfNotes){
                   //on every iteration a random octave between 1 or 2 should be picked, and a random index of that array should also be picked
                   let randomOctave = Math.floor(Math.random() * 2) + 1 
                   if(randomOctave === 1 && !notesInScale.length){
                       randomOctave = 2
                       console.log("switched octave due to empty OC1")
                   }
                   if(randomOctave === 2 && !octaveTwo.length){
                    randomOctave = 1
                    console.log("switched octave due to empty OC2")
                    //prevent crash by breaking if there are no more notes to add
                    if(!notesInScale.length && !octaveTwo.length){
                        console.log("break")
                        console.log(notesInScale, octaveTwo)
                        break
                    }
                }
                   let randomIndex;
                   let oc1Chord = []
                   let oc2Chord = []
                    chord.forEach(note => {
                        if(note.includes("3")){
                            oc1Chord.push(note)
                        }else{
                            oc2Chord.push(note)
                        }
                    })
                   if(randomOctave === 1){
                    
                    console.log(...oc1Chord)
                    notesInScale.forEach((note) => {
                        chord.forEach(chordNote => {
                            if(notesInScale.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 1])){
                                notesInScale.splice(notesInScale.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 1]), 1)
                            }
                            if(notesInScale.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 1])){
                                notesInScale.splice(notesInScale.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 1]), 1)
                            }
                        })
                        oc1Chord.forEach(chordNote => { 

                            //remove notes 2 semitones away here

                            if(notesInScale.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 2])){
                                notesInScale.splice(notesInScale.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 2]), 1)
                                console.log("removed note 2 semitones away")
                            }
                            if(notesInScale.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 2])){
                                notesInScale.splice(notesInScale.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 2]), 1)
                                console.log("removed note 2 semitones away")
                            }
                        })
                       
                        //if chord contains G#, remove A from notesInScale... vice versa
                        
                        if(chord.includes("G#3") && notesInScale.includes("A")){
                            notesInScale.splice(notesInScale.indexOf("A"), 1)
                        }
                        if(chord.includes("A3") && notesInScale.includes("G#")){
                            notesInScale.splice(notesInScale.indexOf("G#"), 1)
                        }

                        if(chord.includes("G3") && notesInScale.includes("A")){
                            notesInScale.splice(notesInScale.indexOf("A"), 1)
                        }
                        if(chord.includes("A3") && notesInScale.includes("G")){
                            notesInScale.splice(notesInScale.indexOf("G"), 1)
                        }

                        if(chord.includes("G#3") && notesInScale.includes("A#")){
                            notesInScale.splice(notesInScale.indexOf("A#"), 1)
                        }
                        if(chord.includes("A#3") && notesInScale.includes("G#")){
                            notesInScale.splice(notesInScale.indexOf("G#"), 1)
                        }
                    })
                    randomIndex = Math.floor(Math.random() * notesInScale.length)
                    let noteToAdd = notesInScale[randomIndex]
                    if(noteToAdd !== undefined){
                        this.setState((prevState) => ({
                            octaveOneNotes: [...prevState.octaveOneNotes, noteToAdd]
                        }))
                        console.log(randomIndex)
                        console.log(...notesInScale, "notes in scale")
                        console.log(noteToAdd)
                        chord.push(`${noteToAdd}3`)
                        notesInScale.splice(randomIndex, 1)
                    }
                   }
                   if(randomOctave === 2){
                    
                    //remove notes from octave two that are 2 semitones apart from any notes in the chord
                        octaveTwo.forEach((note) => {
                            chord.forEach(chordNote => {
                                if(octaveTwo.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 1])){
                                    octaveTwo.splice(octaveTwo.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 1]), 1)
                                }
                                if(octaveTwo.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 1])){
                                    octaveTwo.splice(octaveTwo.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 1]), 1)
                                }
                            })
                            oc2Chord.forEach(chordNote => {
                                
                                if(octaveTwo.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 2])){
                                    octaveTwo.splice(octaveTwo.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) - 2]), 1)
                                }
                                if(octaveTwo.includes(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 2])){
                                    octaveTwo.splice(octaveTwo.indexOf(allNotes[allNotes.indexOf(chordNote.substring(0, chordNote.length - 1)) + 2]), 1)
                                }
                            })
                            //if chord contains G#, remove A from octave two
                            
                        
                            if(chord.includes("G#4") && octaveTwo.includes("A")){
                                octaveTwo.splice(octaveTwo.indexOf("A"), 1)
                                console.log("removed A4 (1)")
                            }
                            if(chord.includes("A4") && octaveTwo.includes("G#")){
                                octaveTwo.splice(octaveTwo.indexOf("G#"), 1)
                                console.log("removed G#4")
                            }
                            // also with G and A , maybe G# and A#
                            if(chord.includes("G4") && octaveTwo.includes("A")){
                                octaveTwo.splice(octaveTwo.indexOf("A"), 1)
                                console.log("removed A4")
                            }
                            if(chord.includes("A4") && octaveTwo.includes("G")){
                                octaveTwo.splice(octaveTwo.indexOf("G"), 1)
                                console.log("removed G4")
                            }
                            //G# and A#
                            if(chord.includes("G#4") && octaveTwo.includes("A#")){
                                octaveTwo.splice(octaveTwo.indexOf("A#"), 1)
                                console.log("removed A#4")
                            }
                            if(chord.includes("A#4") && octaveTwo.includes("G#")){
                                octaveTwo.splice(octaveTwo.indexOf("G#"), 1)
                                console.log("removed G#4")
                            }
                        })
                        randomIndex = Math.floor(Math.random() * octaveTwo.length)
                        let noteToAdd = octaveTwo[randomIndex]
                        if(noteToAdd !== undefined){
                            this.setState((prevState) => ({
                                octaveTwoNotes: [...prevState.octaveTwoNotes, noteToAdd]
                            }))
                            console.log(randomIndex)
                            console.log(...octaveTwo, "oct 2")
                            console.log(noteToAdd)
                            chord.push(`${noteToAdd}4`)
                            octaveTwo.splice(randomIndex, 1)   
                        }
                    }
                }
                console.log(...notesInScale, "notes in scale") 
                console.log(...octaveTwo, "octave 2")
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
                <h1 className='pageTitle'>Chord Generator</h1>
                <br></br>
                    <div className="container-fluid">
                    <div className="row" style={{height: '120px'}}>
                        <div className="col-2"></div>
                        <div className="col-2">
                            <label className="formLabel">Algorithm</label><br></br>
                            <select className="formSelect" style={{width: "120px"}} id="gen-algo" onChange={(event) => this.onAlgoChange(event)}>
                                <option value="classic">Classic</option>
                                <option value="jazz">Jazz</option>
                                <option value="new">New</option>
                                <option value="newest">Newest</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <label className="formLabel">Scale</label><br></br>
                            <select className="formSelect" style={{width: "170px"}} id="chord-scale" onChange={(event) => this.onScaleChange(event)}>
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
                        <div className="col-2"></div>
                    </div>  
                    </div>     
                <button className={"niceButton"} onClick={this.state.genAlgo === "classic" ? this.onGenerate2 : this.state.genAlgo === "jazz" ? this.onGenerate : this.state.genAlgo === "new" ? this.onGenerate3 : this.onGenerate4}>Generate</button>
                {!!this.state.hasBeenGenerated ? <button className={"niceButton"} onClick={this.onPlay}>Play</button>: null}
                {!!this.state.hasBeenGenerated && !!this.props.user.id ? <button className={"niceButton"} onClick={this.handleSave}>{!!this.state.hasBeenSaved ? "Saved" : "Save"}</button>: null}
                <br></br>
                {!!this.state.hasBeenGenerated ? <Piano octaveOne={this.state.octaveOneNotes} octaveTwo={this.state.octaveTwoNotes} scaleKey={this.state.key}></Piano>
                : <Piano octaveOne={[]} octaveTwo={[]} scaleKey={"C"}></Piano>}
            </div>
        )
    }
}