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
            return <li style={{listStyleType: "none"}}>{scale.scale_name}</li>
        })
    }
    renderMinorScales = () => {
        let minorScales = this.props.allScales.filter((scale) => {
            if(scale.scale_name.includes("Minor") && !scale.scale_name.includes("Pentatonic")){
                return scale
            }
        })
        return minorScales.map(scale => {
            return <li style={{listStyleType: "none"}}>{scale.scale_name}</li>
        })
    }
    renderMajorPentatonicScales = () => {
        let majorPentatonicScales = this.props.allScales.filter((scale) => {
            if(scale.scale_name.includes("Major") && scale.scale_name.includes("Pentatonic")){
                return scale
            }
        })
        return majorPentatonicScales.map(scale => {
            return <li style={{listStyleType: "none"}}>{scale.scale_name}</li>
        })
    }
    renderMinorPentatonicScales = () => {
        let minorPentatonicScales = this.props.allScales.filter((scale) => {
            if(scale.scale_name.includes("Minor") && scale.scale_name.includes("Pentatonic")){
                return scale
            }
        })
        return minorPentatonicScales.map(scale => {
            return <li style={{listStyleType: "none"}}>{scale.scale_name}</li>
        })
    }

    render(){
        return(
            <div className="row" style={{paddingTop: "20px", paddingBottom: "20px"}}>
                <div className="col-3 scaleColumn">
                    <h3>Major</h3>
                    {this.renderMajorScales()}
                </div>
                <div className="col-3 scaleColumn">
                    <h3>Minor</h3>
                    {this.renderMinorScales()}
                </div>
                <div className="col-3 scaleColumn">
                    <h3>Major Pentatonic</h3>
                    <ul>
                    {this.renderMajorPentatonicScales()}
                    </ul>
                </div>
                <div className="col-3 scaleColumn">
                    <h3>Minor Pentatonic</h3>
                    {this.renderMinorPentatonicScales()}
                </div>
            </div>
        )
    }
}