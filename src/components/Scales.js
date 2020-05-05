import React from 'react'
import {api} from '../services/api'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'

export default class Scales extends React.Component {
    constructor(){
        super()
        this.state = {
            scales: null
        }
    }

    componentDidMount(){
        this.setState({
            scales: this.props.allScales
        })
    }

    renderMajorScales = () => {
        // console.log(this.props.allScales)
        let majorScales = this.props.allScales.filter((scale) => {
            if(scale.scale_name.includes("Major") && !scale.scale_name.includes("Pentatonic")){
                return scale
            }
        })
        return majorScales.map(scale => {
            return <li style={{listStyleType: "none", margin: "5px"}}>{scale.scale_name}</li>
        })
    }
    renderMinorScales = () => {
        let minorScales = this.props.allScales.filter((scale) => {
            if(scale.scale_name.includes("Minor") && !scale.scale_name.includes("Pentatonic")){
                return scale
            }
        })
        return minorScales.map(scale => {
            return <li style={{listStyleType: "none", margin: "5px"}}>{scale.scale_name}</li>
        })
    }
    renderMajorPentatonicScales = () => {
        let majorPentatonicScales = this.props.allScales.filter((scale) => {
            if(scale.scale_name.includes("Major") && scale.scale_name.includes("Pentatonic")){
                return scale
            }
        })
        return majorPentatonicScales.map(scale => {
            return <li style={{listStyleType: "none", margin: "5px"}}>{scale.scale_name}</li>
        })
    }
    renderMinorPentatonicScales = () => {
        let minorPentatonicScales = this.props.allScales.filter((scale) => {
            if(scale.scale_name.includes("Minor") && scale.scale_name.includes("Pentatonic")){
                return scale
            }
        })
        return minorPentatonicScales.map(scale => {
            return <li style={{listStyleType: "none", margin: "5px"}}>{scale.scale_name}</li>
        })
    }

    render(){
        return(
            <div className="row" style={{padding: "30px"}}>
                <div className="col-3">
                    <h2>Major</h2>
                    <div className="scaleColumn">
                        {this.renderMajorScales()}
                    </div>
                </div>
                <div className="col-3">
                    <h2>Minor</h2>
                    <div className="scaleColumn">
                        {this.renderMinorScales()}
                    </div>
                </div>
                <div className="col-3">
                    <h2>Major Pentatonic</h2>
                    <div className="scaleColumn">
                        {this.renderMajorPentatonicScales()}
                    </div>
                    
                </div>
                <div className="col-3">
                    <h2>Minor Pentatonic</h2>
                    <div className="scaleColumn">
                        {this.renderMinorPentatonicScales()}
                    </div>
                </div>
            </div>
        )
    }
}