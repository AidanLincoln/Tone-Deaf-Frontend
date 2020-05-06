import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Piano extends React.Component {

    orderKeys = () => {
        const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
        let notesToDisplay = []
        let i = allNotes.indexOf(this.props.scaleKey)
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

    mapScaleToKeys = () => {
        const colorObj = {
            'A': 'white',
            'A#': 'black',
            'B': 'white',
            'C': 'white',
            'C#': 'black',
            'D': 'white',
            'D#': 'black',
            'E': 'white',
            'F': 'white',
            'F#': 'black',
            'G': 'white',
            'G#': 'black'
        }   
        return this.orderKeys().map((note, index) => {
            return <div className="col-1"
                style={{border: "5px solid #ff5757", padding: '20px', backgroundColor: colorObj[note], color: colorObj[note] === "white" ? "black" : "white"}}
                key={index}>{note}
            </div>
        })
    }
    
    mapActiveKeys = (octave) => {
        let keyPressed = {
            'A': false,
            'A#': false,
            'B': false,
            'C': false,
            'C#': false,
            'D': false,
            'D#': false,
            'E': false,
            'F': false,
            'F#': false,
            'G': false,
            'G#': false
        }
        octave.forEach((note) => {
            keyPressed[note] = true
        })
        return this.orderKeys().map((note, index) => {
            return <div className="col-1"
            style={{border: "5px solid #ff5757", padding: '20px', backgroundColor: "#ffde59", opacity: keyPressed[note] === false ? "0.5" : "1"}}
            key={index}>
            </div>
        })
    }

    render(){
        return(
            <div style={{marginTop: "-15px"}}>
                <div className="container-fluid">
                {this.props.octaveTwo.length > 0 ?   
                    <div className="row" style={{padding: "40px", paddingLeft:"60px",   paddingRight:"60px"}}>
                        <div className="col-6">
                            <div className="row">
                                {this.mapScaleToKeys()}
                            </div>
                            <div className="row" style={{marginTop: "0px"}}>
                                {this.mapActiveKeys(this.props.octaveOne)}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                {this.mapScaleToKeys()}
                            </div>
                            <div className="row" style={{marginTop: "0px"}}>
                                {this.mapActiveKeys(this.props.octaveTwo)}
                            </div>
                        </div>
                    </div> : 
                    <div>
                        <div className="row" style={{paddingLeft: "180px", paddingRight: "180px", marginTop: "40px"}}>
                            {this.mapScaleToKeys()}
                        </div>
                        <div className="row" style={{paddingLeft: "180px", paddingRight: "180px"}}>
                            {this.mapActiveKeys(this.props.octaveOne)}
                        </div>            
                    </div>}   
                </div> 
            </div>
        )
    }
}