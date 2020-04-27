import React from 'react'
import {api} from '../services/api'

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
        console.log(this.props.allScales)
        this.props.allScales.filter((scale) => {
            if(scale.scale_name.includes("Major") && !scale.scale_name.includes("Pentatonic")){
                return scale
            }
        })
    }
    renderMinorScales = () => {
        
    }
    renderMajorPentatonicScales = () => {
        
    }
    renderMinorPentatonicScales = () => {
        
    }

    render(){
        return(
            <div>Scales
                {this.renderMajorScales()}
                {/* bootstrap */}
            </div>
        )
    }
}