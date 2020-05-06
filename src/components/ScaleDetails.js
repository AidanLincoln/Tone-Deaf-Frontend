import React from 'react'
import { api } from '../services/api'
import { PolySynth, Synth } from 'tone'
import Piano from './Piano'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class ScaleDetails extends React.Component {
    constructor(){
        super()
        this.state = {
            currentScale: null,
            scaleNotes: null
        }
    }
    componentDidMount(){
        if(!!this.props.allScales){
            let scale = this.findScale()
            console.log("remount")
            console.log(scale)
            if(!!scale[0]){
                api.collections.getNotesInCollection(scale[0].id).then((res) => {
                    let notes = res.notes.map((note) => {
                        return note.name
                    })
                    // notes.indexOf(res.collection)
                    this.setState({
                        currentScale: res.collection,
                        scaleNotes: notes
                    })
                    console.log(res)
                })
            }   
        }
    }

    findScale = () => {
        console.log('findscale')
        return this.props.allScales.filter((scale) => {
            let urlParams = this.props.match.params.scale_name
            if(urlParams[1] === '♯'){
                urlParams = urlParams.replace('♯', '#')
            }
            console.log(urlParams)
            return scale.scale_name === urlParams.split('_').join(' ')
        })
    }

    playScale = (event) => {
        event.preventDefault()
        const allNotes = ['C', 'C#', 'D', 'D#', 'E','F', 'F#', 'G', 'G#','A', 'A#', 'B']
        // assign notes to octaves
        let assignedNotes = []
        for(let i = 0; i < this.state.scaleNotes.length; i++){
            if(assignedNotes.length === 0 || allNotes.indexOf(this.state.scaleNotes[i]) > allNotes.indexOf(this.state.scaleNotes[i - 1]) && !assignedNotes[i - 1].includes('4')){
                assignedNotes.push(`${this.state.scaleNotes[i]}3`)
            }else{
                assignedNotes.push(`${this.state.scaleNotes[i]}4`)
            }
        }
        // let assignedNotes2 = this.props.sortNotes(assignedNotes).map(note => {
        //     return note.substr(1);
        // })
        // console.log(assignedNotes2) 

        const polySynth = new PolySynth({
            polyphony: 8,
            volume : -7 ,
            detune : 0 ,
            voice : Synth
        }).toMaster();
        
        assignedNotes.forEach((note, i) => {      
            console.log(note)
            setTimeout(() => {
                polySynth.triggerAttackRelease(note, '0.5');
            }, i * 550);
        })
    }

    renderScale = () => {
        if(!!this.state.currentScale && !!this.state.scaleNotes){
            let scalesNotes = this.state.scaleNotes.map((note) => {
                return ` ${note}`
            })
            let scaleKey = this.state.currentScale.scale_name.split(' ')[0]
            return <div>
                <br></br>
                <h1>{this.state.currentScale.scale_name}</h1>
                <br></br>
                <h1>{scalesNotes.toString()}</h1>
                <br></br>
                <button className="niceButton" onClick={this.playScale}>Play</button>
                <br></br>
                <Piano octaveOne={this.state.scaleNotes} octaveTwo={[]} scaleKey={scaleKey}></Piano>
            </div>
        }
    }

    render(){
        return(
            <div>
                {this.renderScale()}
            </div>
        )
    }
}