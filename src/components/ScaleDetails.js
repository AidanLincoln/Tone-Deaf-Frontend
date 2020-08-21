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
polySynth.set({
    "envelope" : {
        "attack" : 0.005,
    }
});

export default class ScaleDetails extends React.Component {
    constructor(){
        super()
        this.state = {
            currentScale: null,
            scaleNotes: null
        }
    }

    componentDidMount(){
        this.getScaleData(this.props)
    }
    
    getScaleData = (props) => {
        console.log("Finding scale and fetching notes...")
        if(!!props.allScales){
            console.log("found scales in props")
            console.log(props.allScales)
            let scale = this.findScale(props)
            console.log(scale)
            if(!!scale[0]){
                console.log(scale)
                api.collections.getNotesInCollection(scale[0].id).then((res) => {
                    let notes = res.notes.map((note) => {
                        return note.name
                    })
                    console.log("in api call")
                    // notes.indexOf(res.collection)
                    this.setState({
                        currentScale: res.collection,
                        scaleNotes: notes
                    })
                })
            }   
        }
    }

    componentWillReceiveProps(props){
        console.log("Component recieved props")
        console.log(props)
        this.getScaleData(props)
    }

    findScale = (props) => {
        console.log("all scales")
        console.log(props.allScales)
        let scaleToShow = props.allScales.filter((scale) => {
            let urlParams = props.match.params.scale_name
            if(urlParams[1] === '♯'){
                urlParams = urlParams.replace('♯', '#')
            }
            return scale.scale_name === urlParams.split('_').join(' ')
        })
        console.log("scale 2 show")
        console.log(scaleToShow)
        return scaleToShow
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
        if(assignedNotes[0].includes('#')){
            console.log('in if')
            assignedNotes.push(`${assignedNotes[0].substr(0,2)}4`)
        }else{
            console.log("in else")
            assignedNotes.push(`${assignedNotes[0].substr(0,1)}4`)
        }
        console.log(assignedNotes)

        assignedNotes.forEach((note, i) => {      
            setTimeout(() => {
                polySynth.triggerAttackRelease(note, '0.47');
            }, i * 510);
        })
    }

    renderScale = () => {
        if(!!this.state.currentScale && !!this.state.scaleNotes){
            let scalesNotes = this.state.scaleNotes.map((note) => {
                return ` ${note}`
            })
            scalesNotes.push(scalesNotes[0])
            let scaleKey = this.state.currentScale.scale_name.split(' ')[0]
            return <div>
                <h1 className="scaleDetails">{this.state.currentScale.scale_name}</h1>
                <br></br>
                <h2 className="scaleDetails">Notes:</h2>
                <h3 className="scaleDetails">{scalesNotes.toString()}</h3>
                <br></br>
                <button className="niceButton" onClick={this.playScale}>Play</button>
                <br></br>
                <Piano octaveOne={this.state.scaleNotes} octaveTwo={this.state.scaleNotes} scaleKey={scaleKey}></Piano>
            </div>
        }
    }

    returnToLastPage = () => {
        this.props.history.goBack()
    }

    render(){
        return(
            <div>  
                <button className="niceButton" style={{position: "absolute", left: "20px", top: "120px", zIndex: "3"}} onClick={this.returnToLastPage}>Go back</button>  
                <br></br>      
                {this.renderScale()}
            </div>
        )
    }
}