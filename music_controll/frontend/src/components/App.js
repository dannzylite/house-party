import React, {Component} from "react"
import {render} from "react-dom"
import HomePage from "./HomePage"

export default class Apps extends Component {
    constructor(props){
        super(props)
    };

    render(){
        return (
        <div className="center">
            <HomePage/>
        </div>
        )
    }
    
}

const AppDiv = document.getElementById('app')

render(<Apps/>, AppDiv)