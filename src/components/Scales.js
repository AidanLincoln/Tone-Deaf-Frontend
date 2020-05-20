import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


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
        let majorScales = this.props.allScales.filter((scale) => {
            if(scale.scale_name.includes("Major") && !scale.scale_name.includes("Pentatonic")){
                return scale
            }
        })
        return majorScales.map((scale, index) => {
            let url = scale.scale_name.split(' ').join('_')
            if(url[1] === '#'){
                url = url.replace('#', '♯')
            }
            return <Link to={`scales/${url}`} className='scaleLink' style={{color: "black"}} key={index}><li className="scaleLi" style={{listStyleType: "none", margin: "5px"}}>{scale.scale_name}</li></Link>
        })
    }

    renderMinorScales = () => {
        let minorScales = this.props.allScales.filter((scale) => {
            if(scale.scale_name.includes("Minor") && !scale.scale_name.includes("Pentatonic")){
                return scale
            }
        })
        return minorScales.map((scale, index) => {
            let url = scale.scale_name.split(' ').join('_')
            if(url[1] === '#'){
                url = url.replace('#', '♯')
            }
            return <Link to={`scales/${url}`} className='scaleLink' style={{color: "black"}} key={index}><li className="scaleLi" style={{listStyleType: "none", margin: "5px"}}>{scale.scale_name}</li></Link>
        })
    }

    renderMajorPentatonicScales = () => {
        let majorPentatonicScales = this.props.allScales.filter((scale) => {
            if(scale.scale_name.includes("Major") && scale.scale_name.includes("Pentatonic")){
                return scale
            }
        })
        return majorPentatonicScales.map((scale, index) => {
            let url = scale.scale_name.split(' ').join('_')
            if(url[1] === '#'){
                url = url.replace('#', '♯')
            }
            return <Link to={`scales/${url}`} className='scaleLink' style={{color: "black"}} key={index}><li className="scaleLi" style={{listStyleType: "none", marginTop: "5px", marginBottom: "5px"}}>{scale.scale_name}</li></Link>
        })
    }
    
    renderMinorPentatonicScales = () => {
        let minorPentatonicScales = this.props.allScales.filter((scale) => {
            if(scale.scale_name.includes("Minor") && scale.scale_name.includes("Pentatonic")){
                return scale
            }
        })
        
        return minorPentatonicScales.map((scale, index) => {
            let url = scale.scale_name.split(' ').join('_')
            if(url[1] === '#'){
                url = url.replace('#', '♯')
            }
            return <Link to={`scales/${url}`} className='scaleLink' style={{color: "black"}} key={index}><li className="scaleLi" style={{listStyleType: "none", margin: "5px"}}>{scale.scale_name}</li></Link>
        })
    }

    render(){
        return(
            <div className="container-fluid">
            <div className="row" style={{padding: "30px"}}>
                <div className="col-3">
                    <h2 className="scaleLabel">Major</h2>
                    <div className="scaleColumn">
                        {this.renderMajorScales()}
                    </div>
                </div>
                <div className="col-3">
                    <h2 className="scaleLabel">Minor</h2>
                    <div className="scaleColumn">
                        {this.renderMinorScales()}
                    </div>
                </div>
                <div className="col-3">
                    <h2 className="scaleLabel">Major Pentatonic</h2>
                    <div className="scaleColumn">
                        {this.renderMajorPentatonicScales()}
                    </div>
                    
                </div>
                <div className="col-3">
                    <h2 className="scaleLabel">Minor Pentatonic</h2>
                    <div className="scaleColumn">
                        {this.renderMinorPentatonicScales()}
                    </div>
                </div>
            </div>
            </div>
        )
    }
}