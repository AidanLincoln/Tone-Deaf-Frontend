import React from 'react'

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

        // console.log()
        // let i = allNotes.indexOf(this.props.scaleKey)
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

    mapScaleToKeys = () => {
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
            return <div className="col-1"
                style={{border: "5px solid #ff5757", padding: '20px', backgroundColor: colorObj[note], color: colorObj[note] === "white" ? "black" : "white"}}
                key={index}>{note}
            </div>
        })
    }

    mapActiveKeys = (octave) => {
        let keyPressed = {
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
            'B': false
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
                    <div className="row" style={{padding: "40px", paddingLeft:"60px", paddingRight:"60px"}}>
                        <div className="col-6">
                            <div className="row pianoTL">
                                {this.mapScaleToKeys()}
                            </div>
                            <div className="row pianoBL" style={{marginTop: "0px"}}>
                                {/* {this.mapActiveKeys(this.props.octaveOne)} */}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row pianoTR">
                                {this.mapScaleToKeys()}
                            </div>
                            <div className="row pianoBR" style={{marginTop: "0px"}}>
                                {/* {this.mapActiveKeys(this.props.octaveTwo)} */}
                            </div>
                        </div>
                    </div>   
                </div> 
            </div>
        )
    }
}
